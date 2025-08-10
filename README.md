

# ☕ Coffee Shop Presentation

A React + Vite based presentation website for showcasing a coffee shop menu, designed for both in-cafe display and online visitors.  
The project focuses on a clean, responsive UI with the ability to highlight available coffee options directly from the header.

---

## 📋 Features

- **Hero Section** with background image and overlay text.
- **Header Menu** with quick navigation and coffee category options.
- **Available in Café Section** displaying coffee options in a 4-column layout.
- **Responsive Design** optimized for desktop and mobile screens.
- **Centralized Styling** in `index.css` (to be refactored into modular CSS files).
- **Custom Leader/Header Positioning** for improved layout flow.

---

## 🛠 Tech Stack

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** JavaScript (ES6+)
- **Styling:** CSS (currently centralized in `index.css`)

---

## 📂 Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable React components
├── App.jsx          # Main application component
├── index.css        # Global styles (to be split into modules)
└── main.jsx         # App entry point
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone &lt;repo-url&gt;
   cd coffee-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔧 Development Notes

- All styles are currently in `index.css`; future improvement will include splitting into separate CSS files for better maintainability.
- The header now contains coffee category options for quick selection.
- The "Available in Café" section layout has been updated to fit **4 items per row**.
- Leader/Header positioning adjusted to overlay correctly on hero image.

---

## 📅 Roadmap

- [ ] Refactor CSS into modular files.
- [ ] Implement dynamic data loading for menu items.
- [ ] Add animations and transitions.
- [ ] Improve accessibility (ARIA labels, keyboard navigation).
- [ ] Optimize for performance (lazy loading images).

---

## 📄 License

This project is licensed under the MIT License.