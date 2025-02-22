export const getProtectedData = async (): Promise<any> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user signed in");
      return null;
    }

    const token = await user.getIdToken();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/protected`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching protected data:", error);
    return null;
  }
};
