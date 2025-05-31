import {ALGORITHM_NAMES} from "./graph.constants";

export const ALGORITHM_EXPANATIONS:{
  [key: string]: string
} = {
  [ALGORITHM_NAMES.FORCE_DIRECTED_EADES_SPRING_EMBEDDER]: `
      <h5>🌌 Eades Force-Directed Layout (Spring Embedder)</h5>
      <p>
        The <strong>Eades algorithm</strong> is used to draw graphs in a way that makes them look nice and easy to understand.
        It works by simulating physical forces between the nodes (like gravity or magnets 💫).
      </p>

      <h3>🧠 How it Works</h3>
      <ul>
        <li><strong>Nodes repel each other</strong> – like magnets pushing away.</li>
        <li><strong>Edges act like springs</strong> – pulling connected nodes closer.</li>
        <li>The algorithm moves the nodes a bit in each step until the graph looks balanced and spread out.</li>
      </ul>

      <h3>🎯 Goal</h3>
      <p>
        Spread the graph out so it's not too messy: no overlapping nodes, and a nice clear structure.
      </p>

      <h3>💡 Example</h3>
      <p>
        Imagine placing marbles (nodes) on a rubber net. The marbles push away from each other,
        but rubber bands (edges) are pulling some of them back together. After a while,
        everything finds a balanced position!
      </p>

      <h3>📌 When to Use</h3>
      <ul>
        <li>To automatically position nodes without manually dragging them.</li>
        <li>Great for unknown or complex graphs where no clear layout exists.</li>
      </ul>

      <p style="font-style: italic; color: #888;">
        Eades' method is one of the earliest and simplest force-based layouts – a great starting point for graph visualization!
      </p>
    `,
  [ALGORITHM_NAMES.DIJKSTRA]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
    <h2 class="text-2xl font-bold text-indigo-700">🔍 Dijkstra's Algorithm</h2>

    <p>
      Dijkstra's algorithm finds the shortest paths from a starting node to all other nodes in a weighted graph with non-negative edge weights.
    </p>

    <div class="bg-white p-3 rounded-lg border border-indigo-200">
      <h3 class="font-semibold text-indigo-600">⚙️ How It Works:</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li>Initialize all distances as <code>Infinity</code>, except the start node (set to <code>0</code>).</li>
        <li>Use a priority queue (or min-heap) to repeatedly select the node with the smallest distance.</li>
        <li>Update the distances of its neighbors if a shorter path is found.</li>
        <li>Repeat until all nodes are visited or target node is reached (in single-source case).</li>
      </ol>
    </div>

    <div class="bg-white p-3 rounded-lg border border-green-200">
      <h3 class="font-semibold text-green-600">✅ Features:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Guaranteed shortest paths in graphs with non-negative weights.</li>
        <li>Efficient with a priority queue: <code>O((V + E) log V)</code></li>
        <li>Can stop early if destination node is reached.</li>
      </ul>
    </div>

    <div class="bg-white p-3 rounded-lg border border-yellow-200">
      <h3 class="font-semibold text-yellow-600">🧠 Visualization Tip:</h3>
      <p>
        Show visiting nodes in order, highlight edges when relaxing distances, and draw current shortest paths.
      </p>
    </div>

    <div class="text-sm text-gray-500 italic">
      Inspired by real-world applications: Google Maps, network routing, pathfinding in games.
    </div>
  </div>
  `,
  [ALGORITHM_NAMES.MST_KRUSKAL]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
    <h2 class="text-2xl font-bold text-purple-700">🌲 Kruskal's Algorithm</h2>

    <p>
      Kruskal’s algorithm finds a Minimum Spanning Tree (MST) for a connected, undirected, weighted graph — a subset of edges that connects all vertices with the minimum possible total edge weight and no cycles.
    </p>

    <div class="bg-white p-3 rounded-lg border border-purple-200">
      <h3 class="font-semibold text-purple-600">⚙️ How It Works:</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li>Sort all edges in ascending order by weight.</li>
        <li>Initialize a Disjoint Set (Union-Find) for all vertices.</li>
        <li>Iterate through edges in sorted order:</li>
        <ul class="list-disc ml-6">
          <li>If the edge connects two separate trees, add it to the MST.</li>
          <li>Use Union-Find to check for cycles.</li>
        </ul>
        <li>Repeat until the MST includes <code>V - 1</code> edges.</li>
      </ol>
    </div>

    <div class="bg-white p-3 rounded-lg border border-green-200">
      <h3 class="font-semibold text-green-600">✅ Features:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Greedy algorithm — globally chooses the next lightest edge.</li>
        <li>Works well on sparse graphs.</li>
        <li>Time complexity: <code>O(E log E)</code> (dominated by sorting).</li>
      </ul>
    </div>

    <div class="bg-white p-3 rounded-lg border border-yellow-200">
      <h3 class="font-semibold text-yellow-600">🧠 Visualization Tip:</h3>
      <p>
        Start with all edges grayed out. Highlight accepted edges in green and rejected (cycle-creating) ones in red. Show forest merging dynamically.
      </p>
    </div>

    <div class="text-sm text-gray-500 italic">
      Used in network design, clustering, and image segmentation.
    </div>
  </div>
  `,
  [ALGORITHM_NAMES.MST_PRIM]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
    <h2 class="text-2xl font-bold text-emerald-700">🌿 Prim’s Algorithm</h2>

    <p>
      Prim’s algorithm builds a Minimum Spanning Tree (MST) by starting from a single vertex and expanding the tree by adding the cheapest edge from the tree to a new vertex until all vertices are included.
    </p>

    <div class="bg-white p-3 rounded-lg border border-emerald-200">
      <h3 class="font-semibold text-emerald-600">⚙️ How It Works:</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li>Start from any node (usually node 0).</li>
        <li>Use a priority queue (min-heap) to track the minimum weight edge to expand.</li>
        <li>At each step, pick the smallest weight edge connecting a visited node to an unvisited one.</li>
        <li>Add the selected edge to the MST and mark the new vertex as visited.</li>
        <li>Repeat until all nodes are visited.</li>
      </ol>
    </div>

    <div class="bg-white p-3 rounded-lg border border-green-200">
      <h3 class="font-semibold text-green-600">✅ Features:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Greedy algorithm — grows one connected component.</li>
        <li>Time complexity: <code>O(E log V)</code> with min-heap.</li>
        <li>Efficient for dense graphs.</li>
      </ul>
    </div>

    <div class="bg-white p-3 rounded-lg border border-yellow-200">
      <h3 class="font-semibold text-yellow-600">🧠 Visualization Tip:</h3>
      <p>
        Show the MST growing from one point, highlighting selected edges in green and visited nodes. Use a priority queue visualization to show candidate edges.
      </p>
    </div>

    <div class="text-sm text-gray-500 italic">
      Commonly used in network design, cable layout, and broadcast routing.
    </div>
  </div>
  `,
  [ALGORITHM_NAMES.BFS]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
    <h2 class="text-2xl font-bold text-blue-700">🔍 Breadth-First Search (BFS)</h2>

    <p>
      Breadth-First Search is a fundamental graph traversal algorithm that explores neighbors level by level. It visits all nodes at the current depth before moving to the next.
    </p>

    <div class="bg-white p-3 rounded-lg border border-blue-200">
      <h3 class="font-semibold text-blue-600">⚙️ How It Works:</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li>Start from a selected node (source).</li>
        <li>Mark it as visited and enqueue it.</li>
        <li>While the queue is not empty:
          <ul class="list-disc list-inside ml-5">
            <li>Dequeue the front node.</li>
            <li>Visit all its unvisited neighbors and enqueue them.</li>
          </ul>
        </li>
      </ol>
    </div>

    <div class="bg-white p-3 rounded-lg border border-indigo-200">
      <h3 class="font-semibold text-indigo-600">✅ Features:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Finds the shortest path in unweighted graphs.</li>
        <li>Guarantees minimum steps from the start node to any other.</li>
        <li>Time complexity: <code>O(V + E)</code></li>
        <li>Uses a queue (FIFO) to manage traversal.</li>
      </ul>
    </div>

    <div class="bg-white p-3 rounded-lg border border-yellow-200">
      <h3 class="font-semibold text-yellow-600">🧠 Visualization Tip:</h3>
      <p>
        Highlight levels layer by layer. Show a queue being filled and processed in order. Great for visualizing "spreading" behavior from the source node.
      </p>
    </div>

    <div class="text-sm text-gray-500 italic">
      Commonly used in pathfinding, peer-to-peer networks, web crawlers, and AI planning.
    </div>
  </div>
  `,
  [ALGORITHM_NAMES.DFS]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
  <h2 class="text-2xl font-bold text-purple-700">🧭 Depth-First Search (DFS)</h2>

  <p>
    Depth-First Search is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It dives deep before it looks wide.
  </p>

  <div class="bg-white p-3 rounded-lg border border-purple-200">
    <h3 class="font-semibold text-purple-600">⚙️ How It Works:</h3>
    <ol class="list-decimal list-inside space-y-1">
      <li>Start from a selected node (source).</li>
      <li>Mark it as visited.</li>
      <li>Recursively or iteratively explore each unvisited neighbor before backtracking.</li>
    </ol>
  </div>

  <div class="bg-white p-3 rounded-lg border border-indigo-200">
    <h3 class="font-semibold text-indigo-600">✅ Features:</h3>
    <ul class="list-disc list-inside space-y-1">
      <li>Can be implemented using a stack (explicit or call stack).</li>
      <li>Explores deeper paths first before neighbors.</li>
      <li>Time complexity: <code>O(V + E)</code></li>
      <li>Often used to detect cycles and connected components.</li>
    </ul>
  </div>

  <div class="bg-white p-3 rounded-lg border border-yellow-200">
    <h3 class="font-semibold text-yellow-600">🧠 Visualization Tip:</h3>
    <p>
      Highlight one path going deep into the graph, showing the algorithm backtracking once a dead end is reached. Use color to distinguish visited paths.
    </p>
  </div>

  <div class="text-sm text-gray-500 italic">
    Commonly used in puzzles, scheduling, topological sorting, and maze solving.
  </div>
</div>
  `,
  [ALGORITHM_NAMES.ALL_PATHS_DFS_BASED]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
    <h2 class="text-2xl font-bold text-purple-700">🌐 All Available Paths (DFS Based)</h2>

    <p>
      This algorithm finds all possible paths from a start node to a target node in a graph using Depth-First Search (DFS). It explores every route recursively while tracking the path taken.
    </p>

    <div class="bg-white p-3 rounded-lg border border-purple-200">
      <h3 class="font-semibold text-purple-600">⚙️ How It Works:</h3>
      <ol class="list-decimal list-inside space-y-1">
        <li>Start at the source node.</li>
        <li>Recursively explore each neighbor, building the current path.</li>
        <li>Backtrack when reaching a dead end or the target.</li>
        <li>Store all complete paths reaching the destination.</li>
      </ol>
    </div>

    <div class="bg-white p-3 rounded-lg border border-indigo-200">
      <h3 class="font-semibold text-indigo-600">✅ Features:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Uses DFS with backtracking to explore all possibilities.</li>
        <li>Can be memory intensive due to storing all paths.</li>
        <li>Time complexity: Exponential in worst case (<code>O(2^N)</code>).</li>
        <li>Useful in pathfinding, route planning, and decision trees.</li>
      </ul>
    </div>

    <div class="bg-white p-3 rounded-lg border border-yellow-200">
      <h3 class="font-semibold text-yellow-600">🧠 Visualization Tip:</h3>
      <p>
        Highlight each completed path one by one. Use different colors or animate drawing paths step-by-step from source to target.
      </p>
    </div>

    <div class="text-sm text-gray-500 italic">
      Great for understanding path structures, solving puzzles, and exhaustive search problems.
    </div>
  </div>
  `,
  [ALGORITHM_NAMES.DFS_BASED_PATHS]: `
    <div class="p-4 rounded-xl bg-gray-50 shadow-md max-w-xl mx-auto text-gray-800 font-sans space-y-4">
      <h2 class="text-2xl font-bold text-emerald-700">🧭 Shortest / Longest Path (DFS-Based)</h2>

      <p>
        This custom approach uses Depth-First Search (DFS) to explore <strong>all available paths</strong> between a start and end node, and then determines the <strong>shortest</strong> and <strong>longest</strong> among them.
      </p>

      <div class="bg-white p-3 rounded-lg border border-emerald-200">
        <h3 class="font-semibold text-emerald-600">⚙️ How It Works:</h3>
        <ol class="list-decimal list-inside space-y-1">
          <li>Use DFS to explore all possible paths from the start to the end node.</li>
          <li>Store every complete path that reaches the destination.</li>
          <li>After traversal, compare path lengths.</li>
          <li>Select the path with the <strong>minimum</strong> nodes as the shortest and the one with the <strong>maximum</strong> nodes as the longest.</li>
        </ol>
      </div>

      <div class="bg-white p-3 rounded-lg border border-blue-200">
        <h3 class="font-semibold text-blue-600">✅ Features:</h3>
        <ul class="list-disc list-inside space-y-1">
          <li>Uses classic DFS with path tracking and backtracking.</li>
          <li>Simple and effective for small to medium-sized graphs.</li>
          <li>Time complexity: <code>O(2^N)</code> in worst case (due to all paths being stored).</li>
          <li>Doesn't use weights — path length is measured in number of nodes or edges.</li>
        </ul>
      </div>

      <div class="bg-white p-3 rounded-lg border border-yellow-200">
        <h3 class="font-semibold text-yellow-600">🎨 Visualization Tip:</h3>
        <p>
          Draw all paths lightly, then highlight the shortest in green and longest in red. Add animated traversal to show comparison.
        </p>
      </div>

      <div class="text-sm text-gray-500 italic">
        A flexible method useful for unweighted graphs or custom visualizations where full path discovery is desired.
      </div>
    </div>
  `
}
