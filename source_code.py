# ============================================
# Binary Search Variants Library
# Design and Analysis of Algorithms (DAA)
# ============================================

import math

# ------------------------------------------------
# 1. Standard Binary Search
# ------------------------------------------------
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1


# ------------------------------------------------
# 2. Lower Bound
# First position where element >= target
# ------------------------------------------------
def lower_bound(arr, target):
    low = 0
    high = len(arr)

    while low < high:
        mid = (low + high) // 2

        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid

    return low


# ------------------------------------------------
# 3. Upper Bound
# First position where element > target
# ------------------------------------------------
def upper_bound(arr, target):
    low = 0
    high = len(arr)

    while low < high:
        mid = (low + high) // 2

        if arr[mid] <= target:
            low = mid + 1
        else:
            high = mid

    return low


# ------------------------------------------------
# 4. Binary Search in Rotated Sorted Array
# ------------------------------------------------
def rotated_binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid

        # Left half sorted
        if arr[low] <= arr[mid]:

            if arr[low] <= target < arr[mid]:
                high = mid - 1
            else:
                low = mid + 1

        # Right half sorted
        else:

            if arr[mid] < target <= arr[high]:
                low = mid + 1
            else:
                high = mid - 1

    return -1


# ------------------------------------------------
# 5. Peak Element Finder
# ------------------------------------------------
def find_peak(arr):
    low = 0
    high = len(arr) - 1

    while low < high:
        mid = (low + high) // 2

        if arr[mid] < arr[mid + 1]:
            low = mid + 1
        else:
            high = mid

    return low


# ------------------------------------------------
# 6. Binary Search in 2D Matrix
# ------------------------------------------------
def search_matrix(matrix, target):

    rows = len(matrix)
    cols = len(matrix[0])

    low = 0
    high = rows * cols - 1

    while low <= high:
        mid = (low + high) // 2

        row = mid // cols
        col = mid % cols

        value = matrix[row][col]

        if value == target:
            return (row, col)

        elif value < target:
            low = mid + 1

        else:
            high = mid - 1

    return (-1, -1)


# ------------------------------------------------
# 7. Exponential Search
# ------------------------------------------------
def exponential_search(arr, target):

    if arr[0] == target:
        return 0

    i = 1

    while i < len(arr) and arr[i] <= target:
        i *= 2

    low = i // 2
    high = min(i, len(arr) - 1)

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            low = mid + 1

        else:
            high = mid - 1

    return -1


# ------------------------------------------------
# 8. Interpolation Search
# ------------------------------------------------
def interpolation_search(arr, target):

    low = 0
    high = len(arr) - 1

    while low <= high and arr[low] <= target <= arr[high]:

        if low == high:

            if arr[low] == target:
                return low

            return -1

        pos = low + (
            (target - arr[low]) * (high - low)
            // (arr[high] - arr[low])
        )

        if arr[pos] == target:
            return pos

        elif arr[pos] < target:
            low = pos + 1

        else:
            high = pos - 1

    return -1


# ------------------------------------------------
# MENU SYSTEM
# ------------------------------------------------
def main():

    arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

    rotated_arr = [15, 18, 2, 3, 6, 12]

    peak_arr = [1, 3, 20, 4, 1, 0]

    matrix = [
        [1, 3, 5],
        [7, 9, 11],
        [13, 15, 17]
    ]

    while True:

        print("\n================================")
        print(" Binary Search Variants Library ")
        print("================================")

        print("1. Standard Binary Search")
        print("2. Lower Bound")
        print("3. Upper Bound")
        print("4. Rotated Binary Search")
        print("5. Peak Element Finder")
        print("6. Search in 2D Matrix")
        print("7. Exponential Search")
        print("8. Interpolation Search")
        print("9. Exit")

        choice = int(input("\nEnter your choice: "))

        # -----------------------------------------
        if choice == 1:
            target = int(input("Enter target: "))
            result = binary_search(arr, target)

            print("Array:", arr)
            print("Result Index:", result)
            print("Time Complexity: O(log n)")

        # -----------------------------------------
        elif choice == 2:
            target = int(input("Enter target: "))
            result = lower_bound(arr, target)

            print("Array:", arr)
            print("Lower Bound Index:", result)
            print("Time Complexity: O(log n)")

        # -----------------------------------------
        elif choice == 3:
            target = int(input("Enter target: "))
            result = upper_bound(arr, target)

            print("Array:", arr)
            print("Upper Bound Index:", result)
            print("Time Complexity: O(log n)")

        # -----------------------------------------
        elif choice == 4:
            target = int(input("Enter target: "))
            result = rotated_binary_search(rotated_arr, target)

            print("Rotated Array:", rotated_arr)
            print("Result Index:", result)
            print("Time Complexity: O(log n)")

        # -----------------------------------------
        elif choice == 5:
            result = find_peak(peak_arr)

            print("Array:", peak_arr)
            print("Peak Element Index:", result)
            print("Peak Element:", peak_arr[result])
            print("Time Complexity: O(log n)")

        # -----------------------------------------
        elif choice == 6:
            target = int(input("Enter target: "))
            row, col = search_matrix(matrix, target)

            print("Matrix:")
            for r in matrix:
                print(r)

            print("Position:", (row, col))
            print("Time Complexity: O(log(n*m))")

        # -----------------------------------------
        elif choice == 7:
            target = int(input("Enter target: "))
            result = exponential_search(arr, target)

            print("Array:", arr)
            print("Result Index:", result)
            print("Time Complexity: O(log n)")

        # -----------------------------------------
        elif choice == 8:
            target = int(input("Enter target: "))
            result = interpolation_search(arr, target)

            print("Array:", arr)
            print("Result Index:", result)
            print("Average Complexity: O(log log n)")

        # -----------------------------------------
        elif choice == 9:
            print("Exiting Program...")
            break

        else:
            print("Invalid Choice!")


# ------------------------------------------------
# RUN PROGRAM
# ------------------------------------------------
if __name__ == "__main__":
    main()