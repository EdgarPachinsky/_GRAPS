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
    `
}
