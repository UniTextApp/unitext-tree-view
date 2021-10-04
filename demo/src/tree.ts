import { TreeView } from "../../src/TreeView";
import "../../src/TreeView/index.less";
import "./theme.less";

export default async (context: ThisType<Window>) => {
  const TreeData = await (await fetch("data/tree-level-1.json")).json();

  const TreeViewInstance = new TreeView(document.getElementById("treeview-ref")!, TreeData, {
    contextHandler: () => {},
    clickHandler: () => {},
    fetchHandler: async () => {
      return await (await fetch("data/tree-level-1.json")).json();
    },
    listView: {
      createHandler: () => {
        const node = document.createElement("li");
        node.innerHTML = `
  <div class="indent"></div>
  <i class="twist"></i>
  <i class="icon"></i>
  <div class="label"></div>`;
        return node;
      },
      renderHandler: (node, data, index) => {
        const indent = data.getNodeIndent(-1);
        node.title = data.label;
        node.children[0].innerHTML = "<div></div>".repeat(indent);

        if (data.collapsible) {
          const collapsed = (data as any).collapsed;
          node.children[1].className = collapsed ? "ri-arrow-right-s-line" : "ri-arrow-down-s-line";
          node.children[2].className = collapsed ? "ri-folder-2-line" : "ri-folder-open-line";
          // FEAT icon
        } else {
          node.children[1].className = "";
          node.children[2].className = "ri-markdown-line"; // FEAT icon
        }
        node.children[3].innerHTML = indent + "-" + data.label;
      },
    },
  });

  TreeViewInstance.invoke();

  (context as any).TreeViewInstance = TreeViewInstance;
};