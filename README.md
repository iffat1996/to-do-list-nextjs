# Todo List App

This is a simple Todo List application built with **React (Next.js)** and **TypeScript**, utilizing **localStorage** for persistence. The app allows users to:
- Add new tasks with details like activity name, price, type, and accessibility.
- View a list of tasks.
- Delete tasks with a confirmation dialog.
- Get success and alert notifications.

## Features
✅ **Add Tasks** - Users can input an activity, select a type, set a price, and adjust accessibility.
✅ **Store Tasks in LocalStorage** - The list persists even after refreshing the page.
✅ **Success & Alert Popups** - Provides validation error messages and success notifications.
✅ **Delete Confirmation** - Prevents accidental deletions by asking for confirmation before removing a task.

## Project Structure
```
/components
  ├── AlertDialog.tsx    # Displays validation error messages
  ├── SuccessDialog.tsx  # Shows success popups
  ├── ConfirmDialog.tsx  # Confirmation dialog for delete actions
/pages
  ├── index.tsx          # Main page with form and task list
```

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/iffat1996/to-do-list-nextjs.git
   cd todo-list
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Fill in the required fields and click the **Add** button to create a task.
- View the list of added tasks.
- Click **Delete** to remove a task (requires confirmation).
- Get error alerts for missing fields and success messages when adding tasks.

## Technologies Used
- **Next.js** (React Framework)
- **TypeScript** (For type safety)
- **Tailwind CSS** (For styling)
- **Headless UI** (For dialog components)

## Contributing
Feel free to fork the repo and submit pull requests with improvements or new features!

## License
This project is licensed under the MIT License.

