# RedReport - Organized React Structure

This document outlines the new organized structure for the RedReport React application.

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Map/            # Map component
│   │   └── Map.tsx
│   ├── SelectHall/     # SelectHall component
│   │   └── SelectHall.tsx
│   └── index.ts        # Component exports
├── config/             # Configuration files
│   └── firebase.ts     # Firebase configuration
├── constants/          # Application constants
│   └── index.ts        # API, Map, UI constants
├── data/              # Static data
│   └── hallsData.ts   # Hall information
├── hooks/             # Custom React hooks
│   └── useFirebase.ts # Firebase authentication hook
├── services/          # Business logic services
│   ├── analyticsService.ts  # Analytics service
│   └── firebaseService.ts   # Firebase operations
├── types/             # TypeScript type definitions
│   └── index.ts       # All interfaces and types
├── utils/             # Utility functions
│   └── fireBaseUtils.ts    # Firebase error handling
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🏗️ Architecture Overview

### **Components** (`/components`)

- **Map**: Displays the interactive map with safety reports
- **SelectHall**: Form for submitting safety reports

### **Configuration** (`/config`)

- **Firebase**: Centralized Firebase initialization and configuration
- Environment variable validation
- Analytics setup

### **Constants** (`/constants`)

- **API Configuration**: Endpoints and base URLs
- **Map Configuration**: Map settings and bounds
- **Incident Types**: Safety report categories
- **UI Configuration**: Visual settings

### **Data** (`/data`)

- **Halls Data**: Comprehensive list of campus locations
- Sorted alphabetically by building type and name
- Includes coordinates for mapping

### **Services** (`/services`)

- **Firebase Service**: Database operations with retry logic
- **Analytics Service**: Event tracking and monitoring

### **Types** (`/types`)

- **Interfaces**: TypeScript definitions for all data structures
- **Props**: Component prop interfaces
- **API**: Response and error type definitions

### **Utils** (`/utils`)

- **Firebase Utils**: Error handling and retry logic
- **Validation**: Data validation utilities

## 🔧 Key Features

### **Firebase Integration**

- ✅ Environment variable validation
- ✅ Retry logic with exponential backoff
- ✅ Comprehensive error handling
- ✅ Analytics tracking
- ✅ Type-safe operations

### **Component Organization**

- ✅ Separated concerns
- ✅ Reusable components
- ✅ Props interfaces
- ✅ Event callbacks

### **Data Management**

- ✅ Centralized data storage
- ✅ Type-safe data structures
- ✅ Sorted and categorized information

### **Error Handling**

- ✅ Firebase error classification
- ✅ User-friendly error messages
- ✅ Logging and monitoring

## 🚀 Usage

### **Importing Components**

```typescript
import { SelectHall, Map } from "./components";
```

### **Using Services**

```typescript
import { FirebaseService } from "./services/firebaseService";
import { AnalyticsService } from "./services/analyticsService";
```

### **Accessing Data**

```typescript
import { NDHalls, NDHallsWithCoordinates } from "./data/hallsData";
```

### **Using Constants**

```typescript
import { API_ENDPOINTS, MAP_CONFIG, INCIDENT_TYPES } from "./constants";
```

## 🔄 Migration Benefits

1. **Maintainability**: Clear separation of concerns
2. **Scalability**: Easy to add new features
3. **Type Safety**: Comprehensive TypeScript coverage
4. **Error Handling**: Robust error management
5. **Testing**: Isolated components and services
6. **Documentation**: Self-documenting structure

## 📋 Environment Variables

Required environment variables for Firebase:

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```

## 🎯 Next Steps

1. **Testing**: Add unit tests for components and services
2. **State Management**: Consider Redux or Context API for global state
3. **Performance**: Implement React.memo and useMemo optimizations
4. **Accessibility**: Add ARIA labels and keyboard navigation
5. **Internationalization**: Prepare for multi-language support
