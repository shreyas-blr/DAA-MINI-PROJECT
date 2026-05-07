# Binary Search Variants Library

An interactive web dashboard for exploring and visualizing **8 Binary Search algorithm variants**, built as a Design & Analysis of Algorithms (DAA) mini project.

## 🔍 Algorithms Implemented

| # | Algorithm | Description | Time Complexity |
|---|-----------|-------------|-----------------|
| 1 | **Standard Binary Search** | Finds exact target in a sorted array | O(log n) |
| 2 | **Lower Bound** | First position where element ≥ target | O(log n) |
| 3 | **Upper Bound** | First position where element > target | O(log n) |
| 4 | **Rotated Array Search** | Searches in a rotated sorted array | O(log n) |
| 5 | **Peak Element Finder** | Finds a peak element in the array | O(log n) |
| 6 | **2D Matrix Search** | Searches in a row-wise sorted 2D matrix | O(log(n·m)) |
| 7 | **Exponential Search** | Finds range exponentially, then binary searches | O(log n) |
| 8 | **Interpolation Search** | Uses value distribution for position estimate | O(log log n) avg |

## ✨ Dashboard Features

- **Algorithm Selector** — Choose from 8 search variants with a single click
- **Input Array** — Enter custom arrays or generate random sorted arrays
- **Target Input** — Specify the search target (auto-hides for Peak Finder)
- **Result Display** — Shows found index, status, steps taken, and algorithm details
- **Complexity Analysis** — Best, average, and worst case time & space complexity
- **Step-by-Step Visualization** — Watch each iteration with range, mid-point, and decisions
- **Light / Dark Mode** — Toggle between themes with preference persistence

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/shreyas-blr/DAA-MINI-PROJECT.git
   ```
2. Open `index.html` in any modern browser — no server or dependencies required.

## 📁 Project Structure

```
├── source_code.py   # Python implementation with CLI menu
├── index.html       # Dashboard HTML structure
├── style.css        # Dark & light theme styling
├── app.js           # Algorithm logic & interactive UI
└── README.md
```

## 🛠 Tech Stack

- **Frontend** — HTML, CSS, JavaScript (vanilla, no frameworks)
- **Backend Logic** — Python (standalone CLI version)
- **Design** — Glassmorphism, CSS animations, responsive layout

## 📸 Preview

Open `index.html` in your browser to see the interactive dashboard with:
- A premium dark theme with animated background
- Live array cell previews with index labels
- Animated step-by-step search visualization
- Smooth theme toggling between dark and light modes

## 📝 License

This project is for educational purposes as part of a DAA course.
