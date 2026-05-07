// ============================================
// Binary Search Variants — Dashboard Logic
// ============================================

const ALGORITHMS = {
    binary_search: {
        name: 'Standard Binary Search',
        desc: 'Finds exact target in a sorted array.',
        needsTarget: true, useMatrix: false,
        time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        space: 'O(1)',
        barWidth: 30,
        run(arr, target) {
            const steps = [];
            let low = 0, high = arr.length - 1;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                steps.push({ low, high, mid, val: arr[mid], action: arr[mid] === target ? 'found' : arr[mid] < target ? 'go_right' : 'go_left' });
                if (arr[mid] === target) return { index: mid, found: true, steps };
                else if (arr[mid] < target) low = mid + 1;
                else high = mid - 1;
            }
            return { index: -1, found: false, steps };
        }
    },
    lower_bound: {
        name: 'Lower Bound',
        desc: 'First position where element ≥ target.',
        needsTarget: true, useMatrix: false,
        time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        space: 'O(1)', barWidth: 30,
        run(arr, target) {
            const steps = []; let low = 0, high = arr.length;
            while (low < high) {
                const mid = Math.floor((low + high) / 2);
                steps.push({ low, high, mid, val: arr[mid], action: arr[mid] < target ? 'go_right' : 'go_left' });
                if (arr[mid] < target) low = mid + 1; else high = mid;
            }
            steps.push({ low, high, mid: low, val: arr[low], action: 'result' });
            return { index: low, found: true, label: 'Lower Bound Index', steps };
        }
    },
    upper_bound: {
        name: 'Upper Bound',
        desc: 'First position where element > target.',
        needsTarget: true, useMatrix: false,
        time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        space: 'O(1)', barWidth: 30,
        run(arr, target) {
            const steps = []; let low = 0, high = arr.length;
            while (low < high) {
                const mid = Math.floor((low + high) / 2);
                steps.push({ low, high, mid, val: arr[mid], action: arr[mid] <= target ? 'go_right' : 'go_left' });
                if (arr[mid] <= target) low = mid + 1; else high = mid;
            }
            steps.push({ low, high, mid: low, val: arr[low], action: 'result' });
            return { index: low, found: true, label: 'Upper Bound Index', steps };
        }
    },
    rotated_binary_search: {
        name: 'Rotated Array Search',
        desc: 'Searches in a rotated sorted array.',
        needsTarget: true, useMatrix: false,
        defaultArr: '15, 18, 2, 3, 6, 12',
        time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        space: 'O(1)', barWidth: 35,
        run(arr, target) {
            const steps = []; let low = 0, high = arr.length - 1;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                if (arr[mid] === target) { steps.push({ low, high, mid, val: arr[mid], action: 'found' }); return { index: mid, found: true, steps }; }
                if (arr[low] <= arr[mid]) {
                    if (arr[low] <= target && target < arr[mid]) { steps.push({ low, high, mid, val: arr[mid], action: 'go_left' }); high = mid - 1; }
                    else { steps.push({ low, high, mid, val: arr[mid], action: 'go_right' }); low = mid + 1; }
                } else {
                    if (arr[mid] < target && target <= arr[high]) { steps.push({ low, high, mid, val: arr[mid], action: 'go_right' }); low = mid + 1; }
                    else { steps.push({ low, high, mid, val: arr[mid], action: 'go_left' }); high = mid - 1; }
                }
            }
            return { index: -1, found: false, steps };
        }
    },
    find_peak: {
        name: 'Peak Element Finder',
        desc: 'Finds a peak element in the array.',
        needsTarget: false, useMatrix: false,
        defaultArr: '1, 3, 20, 4, 1, 0',
        time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        space: 'O(1)', barWidth: 30,
        run(arr) {
            const steps = []; let low = 0, high = arr.length - 1;
            while (low < high) {
                const mid = Math.floor((low + high) / 2);
                if (arr[mid] < arr[mid + 1]) { steps.push({ low, high, mid, val: arr[mid], action: 'go_right' }); low = mid + 1; }
                else { steps.push({ low, high, mid, val: arr[mid], action: 'go_left' }); high = mid; }
            }
            steps.push({ low, high, mid: low, val: arr[low], action: 'found' });
            return { index: low, found: true, peakValue: arr[low], label: 'Peak Index', steps };
        }
    },
    search_matrix: {
        name: '2D Matrix Search',
        desc: 'Searches in a row-wise sorted 2D matrix.',
        needsTarget: true, useMatrix: true,
        time: { best: 'O(1)', avg: 'O(log(n·m))', worst: 'O(log(n·m))' },
        space: 'O(1)', barWidth: 40,
        run(matrix, target) {
            const steps = []; const rows = matrix.length, cols = matrix[0].length;
            let low = 0, high = rows * cols - 1;
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                const r = Math.floor(mid / cols), c = mid % cols, val = matrix[r][c];
                steps.push({ low, high, mid, row: r, col: c, val, action: val === target ? 'found' : val < target ? 'go_right' : 'go_left' });
                if (val === target) return { row: r, col: c, found: true, steps };
                else if (val < target) low = mid + 1; else high = mid - 1;
            }
            return { row: -1, col: -1, found: false, steps };
        }
    },
    exponential_search: {
        name: 'Exponential Search',
        desc: 'Finds range exponentially, then binary searches.',
        needsTarget: true, useMatrix: false,
        time: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
        space: 'O(1)', barWidth: 35,
        run(arr, target) {
            const steps = [];
            if (arr[0] === target) { steps.push({ low: 0, high: 0, mid: 0, val: arr[0], action: 'found' }); return { index: 0, found: true, steps }; }
            let i = 1;
            while (i < arr.length && arr[i] <= target) { steps.push({ low: i / 2, high: i, mid: i, val: arr[i], action: 'expand' }); i *= 2; }
            let low = Math.floor(i / 2), high = Math.min(i, arr.length - 1);
            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                steps.push({ low, high, mid, val: arr[mid], action: arr[mid] === target ? 'found' : arr[mid] < target ? 'go_right' : 'go_left' });
                if (arr[mid] === target) return { index: mid, found: true, steps };
                else if (arr[mid] < target) low = mid + 1; else high = mid - 1;
            }
            return { index: -1, found: false, steps };
        }
    },
    interpolation_search: {
        name: 'Interpolation Search',
        desc: 'Uses value distribution for position estimate.',
        needsTarget: true, useMatrix: false,
        time: { best: 'O(1)', avg: 'O(log log n)', worst: 'O(n)' },
        space: 'O(1)', barWidth: 20,
        run(arr, target) {
            const steps = []; let low = 0, high = arr.length - 1;
            while (low <= high && arr[low] <= target && target <= arr[high]) {
                if (low === high) {
                    steps.push({ low, high, mid: low, val: arr[low], action: arr[low] === target ? 'found' : 'not_found' });
                    return arr[low] === target ? { index: low, found: true, steps } : { index: -1, found: false, steps };
                }
                const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
                steps.push({ low, high, mid: pos, val: arr[pos], action: arr[pos] === target ? 'found' : arr[pos] < target ? 'go_right' : 'go_left' });
                if (arr[pos] === target) return { index: pos, found: true, steps };
                else if (arr[pos] < target) low = pos + 1; else high = pos - 1;
            }
            return { index: -1, found: false, steps };
        }
    }
};

// ---------- State ----------
let selectedAlgo = 'binary_search';

// ---------- DOM ----------
const $ = id => document.getElementById(id);
const grid = $('algorithm-grid');
const arrayInput = $('array-input');
const matrixInput = $('matrix-input');
const matrixGroup = $('matrix-input-group');
const targetInput = $('target-input');
const targetSection = $('target-input-section');
const runBtn = $('run-btn');
const randomizeBtn = $('randomize-btn');
const arrayPreview = $('array-preview');
const matrixPreview = $('matrix-preview');
const resultContent = $('result-content');
const complexityContent = $('complexity-content');
const vizContent = $('viz-content');

// ---------- Init ----------
function init() {
    grid.addEventListener('click', e => {
        const btn = e.target.closest('.algo-btn');
        if (!btn) return;
        document.querySelectorAll('.algo-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAlgo = btn.dataset.algo;
        onAlgoChange();
    });

    runBtn.addEventListener('click', runAlgorithm);
    randomizeBtn.addEventListener('click', generateRandom);
    arrayInput.addEventListener('input', renderArrayPreview);
    matrixInput.addEventListener('input', renderMatrixPreview);

    onAlgoChange();
    renderArrayPreview();
}

function onAlgoChange() {
    const algo = ALGORITHMS[selectedAlgo];

    // Toggle matrix vs array input
    if (algo.useMatrix) {
        matrixGroup.style.display = '';
        arrayInput.closest('.input-group').style.display = 'none';
        renderMatrixPreview();
    } else {
        matrixGroup.style.display = 'none';
        arrayInput.closest('.input-group').style.display = '';
        if (algo.defaultArr) arrayInput.value = algo.defaultArr;
        else arrayInput.value = '2, 4, 6, 8, 10, 12, 14, 16, 18, 20';
        renderArrayPreview();
    }

    // Toggle target input
    const targetGroup = targetInput.closest('.input-group');
    if (algo.needsTarget) { targetGroup.style.display = ''; }
    else { targetGroup.style.display = 'none'; }
}

// ---------- Parsers ----------
function parseArray() {
    return arrayInput.value.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
}

function parseMatrix() {
    return matrixInput.value.split(';').map(row => row.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)));
}

// ---------- Previews ----------
function renderArrayPreview(highlightIdx = -1, foundIdx = -1) {
    const arr = parseArray();
    arrayPreview.innerHTML = arr.map((v, i) => {
        let cls = 'array-cell';
        if (i === foundIdx) cls += ' found';
        else if (i === highlightIdx) cls += ' highlight';
        return `<div class="${cls}"><span class="cell-index">${i}</span>${v}</div>`;
    }).join('');
}

function renderMatrixPreview(foundR = -1, foundC = -1) {
    const matrix = parseMatrix();
    matrixPreview.innerHTML = matrix.map((row, r) =>
        `<div class="matrix-row">${row.map((v, c) =>
            `<div class="matrix-cell${r === foundR && c === foundC ? ' found' : ''}">${v}</div>`
        ).join('')}</div>`
    ).join('');
}

// ---------- Random Array ----------
function generateRandom() {
    const len = Math.floor(Math.random() * 8) + 6;
    const arr = [];
    let v = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < len; i++) { arr.push(v); v += Math.floor(Math.random() * 8) + 1; }
    arrayInput.value = arr.join(', ');
    renderArrayPreview();
}

// ---------- Run ----------
function runAlgorithm() {
    const algo = ALGORITHMS[selectedAlgo];
    let result;

    if (algo.useMatrix) {
        const matrix = parseMatrix();
        const target = parseInt(targetInput.value, 10);
        if (matrix.length === 0 || isNaN(target)) return;
        result = algo.run(matrix, target);
    } else {
        const arr = parseArray();
        const target = parseInt(targetInput.value, 10);
        if (arr.length === 0) return;
        result = algo.needsTarget ? algo.run(arr, target) : algo.run(arr);
    }

    // Animate button
    runBtn.classList.add('running');
    runBtn.innerHTML = '<span class="spinner"></span> Running...';
    setTimeout(() => {
        runBtn.classList.remove('running');
        runBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Run Algorithm`;
    }, 600);

    displayResult(result, algo);
    displayComplexity(algo);
    displayVisualization(result, algo);

    // Highlight array
    if (algo.useMatrix && result.found) renderMatrixPreview(result.row, result.col);
    else if (!algo.useMatrix) renderArrayPreview(-1, result.found ? result.index : -1);
}

// ---------- Display Result ----------
function displayResult(result, algo) {
    const isMatrix = algo.useMatrix;
    let mainValue, mainLabel;

    if (isMatrix) {
        mainValue = result.found ? `(${result.row}, ${result.col})` : 'Not Found';
        mainLabel = 'Matrix Position';
    } else {
        mainLabel = result.label || 'Result Index';
        mainValue = result.found ? result.index : 'Not Found';
    }

    let extraHTML = '';
    if (result.peakValue !== undefined) {
        extraHTML += `<div class="result-extra-row"><span class="label">Peak Value</span><span class="value">${result.peakValue}</span></div>`;
    }
    extraHTML += `<div class="result-extra-row"><span class="label">Steps Taken</span><span class="value">${result.steps.length}</span></div>`;
    extraHTML += `<div class="result-extra-row"><span class="label">Algorithm</span><span class="value">${algo.name}</span></div>`;

    resultContent.innerHTML = `
        <div class="result-detail">
            <div class="result-main">
                <div class="result-badge ${result.found ? 'success' : 'failure'}">${mainValue}</div>
                <div class="result-info">
                    <span class="result-label">${mainLabel}</span>
                    <span class="result-value">${result.found ? 'Target Found ✓' : 'Target Not Found ✗'}</span>
                </div>
            </div>
            <div class="result-extra">${extraHTML}</div>
        </div>`;
}

// ---------- Display Complexity ----------
function displayComplexity(algo) {
    complexityContent.innerHTML = `
        <div class="complexity-grid">
            <div class="complexity-item">
                <span class="complexity-label">Best Case</span>
                <span class="complexity-value">${algo.time.best}</span>
                <div class="complexity-bar"><div class="complexity-bar-fill" style="width:15%"></div></div>
            </div>
            <div class="complexity-item">
                <span class="complexity-label">Average Case</span>
                <span class="complexity-value">${algo.time.avg}</span>
                <div class="complexity-bar"><div class="complexity-bar-fill" style="width:${algo.barWidth}%"></div></div>
            </div>
            <div class="complexity-item">
                <span class="complexity-label">Worst Case</span>
                <span class="complexity-value">${algo.time.worst}</span>
                <div class="complexity-bar"><div class="complexity-bar-fill" style="width:${algo.barWidth + 20}%"></div></div>
            </div>
            <div class="complexity-item">
                <span class="complexity-label">Space</span>
                <span class="complexity-value">${algo.space}</span>
                <span class="complexity-desc">Auxiliary space used</span>
            </div>
        </div>`;
}

// ---------- Display Visualization ----------
function displayVisualization(result, algo) {
    const actionText = {
        go_right: 'Target is <strong>larger</strong> → search right half',
        go_left: 'Target is <strong>smaller</strong> → search left half',
        found: '<strong style="color:var(--accent-green)">Target found!</strong>',
        not_found: '<strong style="color:var(--accent-red)">Not found at this position</strong>',
        expand: 'Expanding search range exponentially',
        result: 'Converged to result position'
    };

    const stepsHTML = result.steps.map((s, i) => {
        const isFinal = s.action === 'found';
        const isNotFound = s.action === 'not_found';
        const cls = isFinal ? 'final' : isNotFound ? 'not-found' : '';
        const rangeInfo = s.row !== undefined
            ? `Row <span class="mono">${s.row}</span>, Col <span class="mono">${s.col}</span>`
            : `Range [<span class="mono">${s.low}</span>, <span class="mono">${s.high}</span>], Mid = <span class="mono">${s.mid}</span>`;
        return `<div class="viz-step ${cls}">
            <span class="viz-step-num">${i + 1}</span>
            <span class="viz-step-text">${rangeInfo} → Value: <span class="mono">${s.val}</span> — ${actionText[s.action] || s.action}</span>
        </div>`;
    }).join('');

    vizContent.innerHTML = `<div class="viz-steps">${stepsHTML}</div>`;
}

// ---------- Theme Toggle ----------
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('daa-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('daa-theme', next);
    });
}

// ---------- Start ----------
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    init();
});
