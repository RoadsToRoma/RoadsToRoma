import React from 'react';
import {Treebeard} from 'react-treebeard';
import SplitPane from "react-split-pane";
import MonacoEditor from 'react-monaco-editor';

const data = {
  name: 'application',
  toggled: true,
  children: [
    {name: 'main.mag'},
  ]
};

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({cursor: node});
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

  render() {
    const code =
      '@template(macTable, Map(Mac, SwPort))\n' +
      'def l2(pkt: L2Packet, ingestion: SwPort):\n' +
      '  macTable.set(pkt.l2.src, ingestion, 500) # key, value, timeout (seconds)\n' +
      '  if pkt.l2.dst in macTable:\n' +
      '    return shortestPath(here, macTable[pkt.l2.dst])\n' +
      '  else:\n' +
      '    return stp(here)\n' +
      '\n' +
      'def main():\n' +
      '  trd = Thread(l2, macTable={})\n' +
      '  bind(\'external_ingress\', trd)';
    const options = {
      selectOnLineNumbers: true
    };
    return (

      <SplitPane split="vertical" minSize={50} defaultSize={150}
                 style={{position: 'relative',width: '100%', height: '100%', background: '#1e1e1e'}}>
        <div style={{background: '#21252B', height: '600px', paddingLeft: 5}}>
          <Treebeard
            data={data}
            //onToggle={this.onToggle}
          />
        </div>
        <MonacoEditor
          height="100%"
          language="python"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </SplitPane>
    );
  }
}

export default Editor;
