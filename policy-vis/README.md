# Policy-Visualizer #

## Description ##

This project was made with the goal of making a browser-based JavaScript visualizer for policies produced by RAO* examples. We are hoping to address the needs to debug and share resulting policies with this tool.

The lisp RAO* implementation now has a *save-solution-graph-to-json* function in order to convert the results into a format that can be directly uploaded to the visualizer.

The Viz.js graphing library was developed by Almende B.V. and the project is available at [https://github.com/almende/vis](https://github.com/almende/vis).

## Hosted Web Application

The application is currently hosted and available on http://128.30.27.246. If that address doesn't resolve itself then send an email my way at mdeyo@mit.edu so I can update it.

## Local Installation (Optional)

There are no additional dependencies to get this project working, just clone the repo and navigate to index.html with your browser.

## Using the Visualizer

There are currently three example policy examples included with the application. These can be viewed under Open->Examples in the tool bar.

But you're really here to visualize your own policy graphs, so you're going to need to organize your data into the format described below.

## Creating a Policy JSON Object

We are trying to make this visualization tool as generic as possible, starting with policies that are represented with hyper-graphs.

Your saved JSON file needs to have at least two objects, one named "nodes" and another named "edges". The third "settings" object is optional but is useful for initializing your graph with certain parameters.

There are a few JSON example files in the folder http://128.30.27.246/examples/ that you can use as reference as well.

## Defining Nodes ##

The "nodes" object contains an object for each node with unique name (like node-0, node-1, etc. in our examples). There are no required properties for each node object. Any property that is included in the node objects can be displayed in the visualizer.

Minimum nodes object:
```json
"nodes": {
  "unique-node-id": {
      "state": "hello world"
  }
}
```
Example nodes object:
```json
    "node-0": {
        "state": "[(= R1-LOCATION L1)(= R1-MASTCAM OFF)] (Execution step: 0)",
        "risk": 0.0,
        "value": 30,
        "is-terminal": "false"
    },
    "node-1": {
        "state": "[(= R1-LOCATION L1)(= R1-MASTCAM ON)] (Execution step: 1)",
        "risk": 0.05,
        "value": 35,
        "is-terminal": "true"
    },
    "node-2": {
        "state": "[(= R1-LOCATION L1)(= R1-MASTCAM BROKEN)] (Execution step: 1)",
        "risk": 0.1,
        "value": 40,
        "is-terminal": "false"
    },
    "node-3": {
        "state": "[(= R1-LOCATION L1)(= R1-MASTCAM ON)] (Execution step: 2)",
        "risk": 0.1,
        "value": 45,
        "is-terminal": "true"
    }
}
```

## Defining Edges ##

The "edges" object contains an object for each edge in the hyper-graph, so a separate edge for each child state, each with a unique name (like edge-0, edge-1, etc. in our examples).

There are two required properties for each edge object! The application is looking for both "predecessor" (singular) and "successors" (plural). The predecessor object 

Any additional property that is included in the edge objects can also be displayed in the visualizer.

```json
"edges": {
    "edge-0": {
        "action": "(= R1-MASTCAM.CMD TURN_ON)",
        "predecessor": "node-0",
        "successors": ["node-1", "node-2"]
    },
    "edge-1": {
        "action": "(= R1-MASTCAM.CMD FIX)",
        "predecessor": "node-2",
        "successors": ["node-3"]
    }
}
```

## Defining Settings ##

```json
"settings": {
    "nodes": {
        "display-properties": ["value"],
        "color": "#99ccff",
        "terminal-color": "#7BE141"
    },
    "edges": {
        "display-properties": ["action", "probability"],
        "color": "#99ccff"
    }
}
```

## Code Example ##

An example data file is included as examples/example_simple.json to be uploaded into the visualizer.

The json formatting is shown below with three objects within the json file:
  * nodes
  * edges
  * settings (optional)


```json
{
    "nodes": {
        "node-0": {
            "state": "[(= R1-LOCATION L1)(= R1-MASTCAM OFF)] (Execution step: 0)",
            "risk": 0.0,
            "value": 30,
            "is-terminal": "false"
        },
        "node-1": {
            "state": "[(= R1-LOCATION L1)(= R1-MASTCAM ON)] (Execution step: 1)",
            "risk": 0.05,
            "value": 35,
            "is-terminal": "true"
        },
        "node-2": {
            "state": "[(= R1-LOCATION L1)(= R1-MASTCAM BROKEN)] (Execution step: 1)",
            "risk": 0.1,
            "value": 40,
            "is-terminal": "false"
        },
        "node-3": {
            "state": "[(= R1-LOCATION L1)(= R1-MASTCAM ON)] (Execution step: 2)",
            "risk": 0.1,
            "value": 45,
            "is-terminal": "true"
        }
    },
    "edges": {
        "edge-0": {
            "action": "(= R1-MASTCAM.CMD TURN_ON)",
            "predecessor": "node-0",
            "successors": ["node-1", "node-2"]
        },
        "edge-1": {
            "action": "(= R1-MASTCAM.CMD FIX)",
            "predecessor": "node-2",
            "successors": ["node-3"]
        }
    },
    "settings": {
        "nodes": {
            "display-properties": ["value"],
            "color": "#99ccff",
            "terminal-color": "#7BE141"
        },
        "edges": {
            "display-properties": ["action", "probability"],
            "color": "#99ccff"
        }
    }
}
```

More detailed examples to come...

## Browser Compatibility

At this point, we know that all of the included visualization features function with:
  * Firefox 47.0
  * Chrome 52.0.2743.82

## Contributors

We are looking to generalize this project for any policy visualization needs of the group. That means we want to get feedback on problems that you encounter and new ideas that you have to improve this tool, including:

  * JSON formatting issues
  * Browser compatibility issues
  * New features to transform the policy graph
  * Adding functionality for policies other than those currently supported
  * ...

