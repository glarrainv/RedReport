import { FirebaseError } from "../types/index.ts";

export class FirebaseErrorHandler {
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries) {
          throw lastError;
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, attempt - 1))
        );
      }
    }

    throw lastError!;
  }

  static handleFirebaseError(error: any): string {
    switch (error.code) {
      case "permission-denied":
        return "Access denied. Please check your permissions.";
      case "unavailable":
        return "Service temporarily unavailable. Please try again.";
      case "deadline-exceeded":
        return "Request timed out. Please try again.";
      case "not-found":
        return "The requested resource was not found.";
      case "already-exists":
        return "The resource already exists.";
      case "resource-exhausted":
        return "Service quota exceeded. Please try again later.";
      case "failed-precondition":
        return "Operation failed due to a precondition.";
      case "aborted":
        return "Operation was aborted.";
      case "out-of-range":
        return "Operation is out of valid range.";
      case "unimplemented":
        return "Operation is not implemented.";
      case "internal":
        return "Internal error occurred. Please try again.";
      case "unavailable":
        return "Service is currently unavailable.";
      case "data-loss":
        return "Data loss occurred.";
      case "unauthenticated":
        return "Authentication required.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }

  static isFirebaseError(error: any): error is FirebaseError {
    return (
      error &&
      typeof error.code === "string" &&
      typeof error.message === "string"
    );
  }

  static logError(error: any, context: string): void {
    console.error(`Firebase Error in ${context}:`, {
      code: error.code,
      message: error.message,
      details: error.details,
      stack: error.stack,
    });
  }
}
