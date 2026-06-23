export const validateTask = (title: string, description: string): string | null => {
    if (!title.trim()) return 'Title is required.';
    if (title.trim().length < 3) return 'Title must be at least 3 characters.';
    if (!description.trim()) return 'Description is required.';
    if (description.trim().length < 5) return 'Description must be at least 5 characters.';
    return null;
  };