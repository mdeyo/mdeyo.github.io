/**
 * @fileOverview Policy Visualizer Project
 * @author <a href="mailto:jd@example.com">Matt Deyo</a>
 * @version 0.0.1
 */

var cleanedUpText;
var btnUD;
var btnLR;
var levelSeparationValue = 200;
var nodeSpacingValue = 550;

/** Object parsed from JSON that represents the nodes/states of the graph */
var nodesFromJSON;
/** Object parsed from JSON that represents the edges/links of the graph */
var edgesFromJSON;
/** Array of node objects that are directly used in network graph */
var networkNodesList = [];
/** Array of edge objects that are directly used in network graph */
var networkEdgesList = [];
/**Object generated through iteration to include all of the links between parent and children nodes in the graph */
var ourGraph;
/** Array of strings, the selected property tags, a subset of the properties from nodesFromJSON and edgesFromJSON */
var listOfSelectedProperties = [];
/** String, id of the root node, calculated as the node without parents */
var rootID;
/** Vis js network graph */
var network;
/** Object with options for vis js network graph */
var networkOptions;


/**
 * @function
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function init() {
    document.getElementById("probability_input")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode == 13) {
                greyOutProbabilities(document.getElementById("probability_input").value);
            }
        });

    var checkboxes = document.getElementsByTagName('input');

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
            checkboxes[i].checked = false;
        }
    }

    $(function() {
        $("#output_obj_container").resizable();
        $("#output_plan_container").resizable();
    });


    $('li.dropdown.mega-dropdown a').on('click', function(event) {
        $(this).parent().toggleClass("open");
    });

    $('body').on('click', function(e) {
        if (!$('li.dropdown.mega-dropdown').is(e.target) && $('li.dropdown.mega-dropdown').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
            $('li.dropdown.mega-dropdown').removeClass('open');
        }
    });

    hierarchicalDirection = "UD";

    networkOptions = {
        layout: {
            improvedLayout: true,
            hierarchical: {
                enabled: false
            }
        },
        interaction: {
            hover: true,
            hideEdgesOnDrag: true

        },
        edges: {
            smooth: {
                type: 'continuous'
            }
        },
        physics: false
    };

}

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function updateHierarchical(cb) {
    // console.log("Clicked, new value = " + cb.checked);
    if (cb.checked) {
        document.getElementById("interactions").style.display = "inline-flex";
        document.getElementById("slider1").value = "5";
        document.getElementById("slider2").value = "5";

        networkOptions.layout.hierarchical.enabled = true;
        networkOptions.physics = false;
    } else {
        document.getElementById("interactions").style.display = "none";

        networkOptions.physics = false;
        networkOptions.layout.hierarchical.enabled = false;
    }
}

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function orientUD() {
    hierarchicalDirection = "UD";
    networkOptions.layout.hierarchical.direction = "UD";
    network.setOptions(networkOptions);
    fitAnimated();
}

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function orientLR() {
    hierarchicalDirection = "LR";
    networkOptions.layout.hierarchical.direction = "LR";
    network.setOptions(networkOptions);
    fitAnimated();
}

/**
 * Function called when the first slider input is changed. The slideAmount value is used to update the levelSeparationValue and update the hierarchical network.
 */
function updateSlider1(slideAmount) {
    levelSeparationValue = slideAmount * 100 + 100;
    console.log(levelSeparationValue);
    networkOptions.layout.hierarchical.levelSeparation = levelSeparationValue;
    network.setOptions(networkOptions);
    fitAnimated();
}

/**
 * Function called when the second slider input is changed. The slideAmount value is used to update the nodeSpacingValue and update the hierarchical network.
 */
function updateSlider2(slideAmount) {
    nodeSpacingValue = slideAmount * 100 + 100;
    console.log(nodeSpacingValue);
    networkOptions.layout.hierarchical.nodeSpacing = nodeSpacingValue;
    network.setOptions(networkOptions);
    fitAnimated();
}

/**
 * Function that converts JSON string into a nicely formatted string with newlines and tabs to make it easier to read.
 * @param {String} json
 */
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function openFile(event) {
    document.getElementById('coverup').style.display = "block";

    //reset the updateProperties dialogue
    listOfSelectedProperties = [];
    document.getElementById('properties_form').innerHTML = "<h3 style='margin: 0px;''>Select properties to draw on nodes:</h3>";

    var input = event.target;

    var reader = new FileReader();
    reader.onload = function() {

        var text = reader.result;
        // console.log(text);
        showPolicy(JSON.parse(text));
        var node = document.getElementById('output');
        // node.innerText = text;
        // node.innerText =JSON.parse(text);

    };
    reader.readAsText(input.files[0]);
};

function loadExample() {
    console.log("loadExample");
    showPolicy(exampleJSON);
}

/**
 * Function that uses built-in vis js animation to adjust the scaling/zoom to include the whole network when called.
 */
function fitAnimated() {
    var options = {
        duration: 500,
        easingFunction: "easeInOutQuad"
    };
    network.fit({
        animation: options
    });
}

/**
 * Resets the visible vis js network with global objects networkNodesList and networkEdgesList.
 */
function resetNetwork() {
    network.setData({
        nodes: networkNodesList,
        edges: networkEdgesList
    });
}

/**
 * Changes the color of nodes to grey with transparency if the calculated probability of that state occuring is less than the input probability
 * If you input num = 0.5, then those states with less than 50% chance of occuring will have color changed to grey.
 * If num > 1.0, then all nodes have color changed to grey.
 * @param {Number} num
 * @param {Number} b
 * @return {None}
 */
function greyOutProbabilities(num) {

    resetColors();

    for (node in networkNodesList) {
        if (ourGraph[networkNodesList[node].id].probability < num) {
            networkNodesList[node].color = "rgba(200,200,200,.3)";
        }
    }

    resetNetwork();
}

/**
 * Reset all node colors to the original values saved in "actualColor" property.
 */
function resetColors() {

    for (node in networkNodesList) {
        networkNodesList[node].color = networkNodesList[node].actualColor;
    }

    resetNetwork();
}

/**
 * Function called to show the properties form/menu and screen coverup
 */
function showPropertyOptions() {
    document.getElementById('properties_form').style.display = "block";
    document.getElementById('coverup').style.display = "block";
    document.getElementById('close_properties').style.display = "block";
}

/**
 * Function called to hide the properties form/menu and screen coverup
 */
function hidePropertyOptions() {
    document.getElementById('properties_form').style.display = "none";
    document.getElementById('coverup').style.display = "none";
    document.getElementById('close_properties').style.display = "none";
}

/**
 * Function called to show the properties form/menu and screen coverup
 */
function showExamples() {
    document.getElementById('examples_form').style.display = "block";
    document.getElementById('coverup').style.display = "block";
    document.getElementById('close_examples').style.display = "block";
}

/**
 * Function called to hide the properties form/menu and screen coverup
 */
function hideExamples() {
    document.getElementById('examples_form').style.display = "none";
    document.getElementById('coverup').style.display = "none";
    document.getElementById('close_examples').style.display = "none";
}

/**
 * Function called for each node and edge property in order to add them to the properties display menu.
 */
function addPropertyCheckbox(type, property) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = property;
    checkbox.value = "value";
    checkbox.id = type + "-&-" + property;

    if (property == "Node ID") {
        checkbox.checked = true;
    }

    var label = document.createElement('label')
    label.htmlFor = property;
    label.appendChild(document.createTextNode(property));

    document.getElementById('properties_form').appendChild(checkbox);
    document.getElementById('properties_form').appendChild(label);
    document.getElementById('properties_form').appendChild(document.createElement('br'));
}

/**
 * Last function called when initializing the properties menu, after the node and edge
 * properties have all been added to menu options. This function adds the submit button.
 */
function finishProperties() {
    var submit = document.createElement('button');
    submit.type = "button";
    submit.innerHTML = "Update";
    submit.onclick = updateProperties;
    submit.style = "margin-top:10px;"
    document.getElementById('properties_form').appendChild(submit);
}

/**
 * Function used by bootstrap component when the user clicks on the "Open" button.
 * This function calls the click function of the file-input div in order to upload a file.
 */
function open_file_go(e) {
    // The user actually wants to open a new file.
    // Try to trigger the file opener
    document.getElementById('file-input').click();
}

/**
 * Focuses on the root node with the zoom/scale input.
 * Greater scale values result in more zoom.
 * @param {Number} scale
 */
function focusRoot(scale) {
    var options = {
        // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
        scale: scale,
        animation: {
            duration: 1000,
            easingFunction: "easeInOutQuad"
        }
    };
    network.focus(rootID, options);
}

/**
 * Initialization of properties from the settings JSON object, breaks down into "nodes" and "edges" objects if they exist.
 * See the application-use documentation for settings options.
 */
function initProperties(settings_obj) {

    if (settings_obj) {

        if (settings_obj['hierarchical']) {
            if (settings_obj['hierarchical'] == "true") {
                var checkbox = document.getElementById("hierarchical_check");
                checkbox.checked = true;
                updateHierarchical(checkbox);
                if (settings_obj['levelSpacing']) {
                    levelSeparationValue = settings_obj['levelSpacing'];
                }
                if (settings_obj['nodeSpacing']) {
                    nodeSpacingValue = settings_obj['nodeSpacing'];
                }
                networkOptions.layout.hierarchical.levelSeparation = levelSeparationValue;
                networkOptions.layout.hierarchical.nodeSpacing = nodeSpacingValue;
            }
        }

        var nodes_settings = settings_obj['nodes'];

        if (nodes_settings) {
            var list_of_properties = nodes_settings['display-properties'];
            if (list_of_properties) {
                var property_name;
                var new_label = "";
                for (node in networkNodesList) {
                    var new_label = "";
                    for (i in list_of_properties) {
                        property_name = list_of_properties[i];
                        if (property_name == "node_id") {
                            new_label = new_label + [networkNodesList[node].id] + "\n";
                        }
                        if (property_name == "probability") {
                            prob = (ourGraph[networkNodesList[node].id].probability * 100).toFixed(2);
                            if (prob == 0.000) {
                                new_label = new_label + "prob: ~0.00%\n";
                            } else {
                                new_label = new_label + "prob: " + prob + "%\n";
                            }
                        } else {
                            if (nodesFromJSON[networkNodesList[node].id][property_name]) {
                                new_label = new_label + property_name + ": " + nodesFromJSON[networkNodesList[node].id][property_name].toString() + "\n";
                            }
                        }
                    }
                    new_label = new_label.replace(/^\s+|\s+$/g, '');
                    networkNodesList[node].label = new_label;
                }
            }
        }


        var edges_settings = settings_obj['edges'];

        if (edges_settings) {
            var list_of_properties = edges_settings['display-properties'];
            if (list_of_properties) {
                var property_name;
                var new_label = "";
                var short_edge_name;
                for (edge in networkEdgesList) {
                    var new_label = "";
                    short_edge_name = networkEdgesList[edge].id.split("b%@%n")[0];
                    for (i in list_of_properties) {
                        property_name = list_of_properties[i];
                        if (property_name == "edge_id") {
                            new_label = new_label + [networkEdgesList[edge].id] + "\n";
                        }
                        if (property_name == "probability") {
                            prob = (networkEdgesList[edge].probability * 100).toFixed(2);
                            if (prob == 0.000) {
                                new_label = new_label + "prob: ~0.00%\n";
                            } else {
                                new_label = new_label + "prob: " + prob + "%\n";
                            }
                        } else {
                            // console.log(edge);
                            // console.log(networkEdgesList[edge]);
                            // console.log(short_edge_name);
                            if (edgesFromJSON[short_edge_name][property_name]) {
                                // console.log(edge);
                                // console.log(networkEdgesList[edge]);
                                new_label = new_label + property_name + ": " + edgesFromJSON[short_edge_name][property_name].toString() + "\n";
                            }
                        }
                    }
                    new_label = new_label.replace(/^\s+|\s+$/g, '');
                    networkEdgesList[edge].label = new_label;
                }
            }
        }


        network.setData({
            nodes: new vis.DataSet(networkNodesList),
            edges: new vis.DataSet(networkEdgesList)
        });

        hidePropertyOptions();
    } else {
        showPropertyOptions();
    }

}

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function updateProperties() {
    listOfSelectedProperties = [];
    // console.log("updateProperties");

    hidePropertyOptions();

    var properties = document.getElementById('properties_form');
    var child = properties.firstChild;

    while (child) {
        // console.log(child);
        if (child.type == "checkbox" && child.checked) {
            listOfSelectedProperties.push({
                'type': child.id.split("-&-")[0],
                'property': child.id.split("-&-")[1]
            });
        }

        child = child.nextSibling;
    }

    var property_name;
    var new_label = "";
    var edge_id;
    var short_edge_name;
    var prob;

    for (node in networkNodesList) {
        new_label = "";
        for (i in listOfSelectedProperties) {
            property_name = listOfSelectedProperties[i];
            if (property_name.type == "node") {
                if (property_name.property == "Node ID") {
                    new_label = new_label + [networkNodesList[node].id] + "\n";
                }
                if (property_name.property == "Probability") {
                    prob = (ourGraph[networkNodesList[node].id].probability * 100).toFixed(2);
                    if (prob == 0.000) {
                        new_label = new_label + "prob: ~0.00%\n";
                    } else {
                        new_label = new_label + "prob: " + prob + "%\n";
                    }
                } else {
                    if (nodesFromJSON[networkNodesList[node].id][property_name.property]) {
                        new_label = new_label + property_name.property + ": " + nodesFromJSON[networkNodesList[node].id][property_name.property].toString() + "\n";
                    }
                }
            }
        }
        new_label = new_label.replace(/^\s+|\s+$/g, '');
        networkNodesList[node].label = new_label;
    }

    for (edge in networkEdgesList) {
        new_label = "";
        edge_id = networkEdgesList[edge].id;
        short_edge_name = edge_id.split("b%@%n")[0];
        for (i in listOfSelectedProperties) {
            property_name = listOfSelectedProperties[i];
            if (property_name.type == "edge") {
                if (property_name.property == "Edge ID") {
                    new_label = new_label + [short_edge_name] + "\n";
                }
                if (property_name.property == "Probability") {
                    new_label = new_label + "prob: " + networkEdgesList[edge].probability + "\n";

                } else {
                    if (edgesFromJSON[short_edge_name][property_name.property]) {
                        new_label = new_label + property_name.property + ": " + edgesFromJSON[short_edge_name][property_name.property].toString() + "\n";
                    }
                }
            }
        }
        new_label = new_label.replace(/^\s+|\s+$/g, '');
        networkEdgesList[edge].label = new_label;
    }

    network.setData({
        nodes: new vis.DataSet(networkNodesList),
        edges: new vis.DataSet(networkEdgesList)
    });
}

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function showPolicy(policy) {
    // console.log(JSON.stringify(policy));

    var ourGraph_states = policy['nodes'];
    var ourGraph_edges = policy['edges'];
    var ourGraph_settings = policy['settings'];

    console.log(ourGraph_settings);

    nodesFromJSON = ourGraph_states; //global var
    edgesFromJSON = ourGraph_edges; //global var
    ourGraph = ourGraph_states


    networkNodesList = [];
    networkEdgesList = [];

    var links = [];

    var current_state_obj = null;
    var next_timestep = 0;
    var color = "#99ccff"


    color = "#7BE141"; //green color!
    var child_node;
    var parent_node;



    /// Recreate our own graph object with the input nodes and edges objects ///

    // Makes it much easier to do the analysis of relationships instead
    // of looping through the nodes and edges each time to find matches

    for (name in ourGraph) {
        ourGraph[name].parents = {};
        ourGraph[name].children = {};
    }

    for (edge_name in ourGraph_edges) {
        current_edge_obj = ourGraph_edges[edge_name];
        if (ourGraph[current_edge_obj['predecessor']]) {
            parent_node = ourGraph[current_edge_obj['predecessor']];
            for (child_name in current_edge_obj['successors']) {
                child_node = ourGraph[child_name];
                parent_node.children[child_name] = {
                    // 'edge': JSON.stringify(current_edge_obj),
                    'action': current_edge_obj.action,
                    'probability': current_edge_obj.successors[child_name].probability
                };
                child_node.parents[current_edge_obj['predecessor']] = {
                    // 'edge': current_edge_obj.toString(),
                    'action': current_edge_obj.action,
                    'probability': current_edge_obj.successors[child_name].probability
                };
            }
        } else {
            console.error("edges contains a node not in graph");
        }
    }
    /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///


    /// Iteratively calculate probability of each state occuring given transitions ///

    // start by adding all of the graph node names to the queue
    var calc_prob_queue = Object.keys(ourGraph);
    var current_node_name;
    var current_node;
    var parents_calculated = false;
    var calculated_prob;

    while (calc_prob_queue.length > 0) {
        current_node_name = calc_prob_queue.shift();
        current_node = ourGraph[current_node_name];
        parents_calculated = true;
        calculated_prob = 0;

        if (jQuery.isEmptyObject(current_node.parents)) {
            current_node.probability = 1.0; //found our root!
            rootID = current_node_name;
            current_node['depth'] = 0;
            continue;
        }

        if (jQuery.isEmptyObject(current_node.children)) {
            current_node.terminal = true;
        }

        for (parent in current_node.parents) {
            if (ourGraph[parent].probability == null) {
                parents_calculated = false;
                break;
            } else {
                calculated_prob = calculated_prob + ourGraph[parent].probability * current_node.parents[parent].probability;
            }
        }
        if (!parents_calculated) {
            calc_prob_queue.push(current_node_name);
        } else {
            current_node.probability = calculated_prob;
        }
    }
    /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// ///


    /// Add all the nodes to the list of states and set color ///
    for (name in ourGraph_states) {
        current_state_obj = ourGraph_states[name];
        color = "#99ccff"; // blue color

        if (current_state_obj.terminal) {
            color = "#7BE141"; // green color!
        }
        if (current_state_obj.state) {
            if (current_state_obj.state.includes('crashed')) {
                if (current_state_obj.state.split("crashed:")[1].includes("T")) {
                    color = "#ff0000"; // red color!
                }
            }
            if (current_state_obj.state.includes('COLLISION')) {
                if (current_state_obj.state.split("COLLISION")[1].substring(0,2).includes("T")) {
                    color = "#ff0000"; // red color!
                }
            }
        }
        if (current_state_obj['state-risk']){
          if(current_state_obj['state-risk'] == 1){
            color = "#ff0000"; // red color!
          }
        }
        networkNodesList.push({
            id: name,
            label: name,
            level: 0,
            title: current_state_obj['state'],
            color: color,
            actualColor: color
        });
    }

    addPropertyCheckbox("node", "Node ID");
    addPropertyCheckbox("node", "Probability");

    for (property in current_state_obj) {
        addPropertyCheckbox("node", property);
    }

    var current_edge_obj = null;
    var child_state = null;

    //Iterate all action/connections saved
    for (edge_name in ourGraph_edges) {
        current_edge_obj = ourGraph_edges[edge_name];
        // console.log(current_edge_obj);

        //check for existence of the predecessor state in our known states
        if (ourGraph_states[current_edge_obj['predecessor']]) {
            current_state_obj = ourGraph_states[current_edge_obj['predecessor']];
            current_state_obj['color'] = "#99ccff";

            //Iterate through the children/successors of this saved action/connection
            var branch_num = -1;
            for (child_state in current_edge_obj['successors']) {
                branch_num = branch_num + 1;

                if (Object.prototype.toString.call(current_edge_obj['successors']) === '[object Array]') {
                    child_state = current_edge_obj['successors'][child_state];
                }

                //check for existence of the child state in our known states
                if (ourGraph_states[child_state]) {
                    //Updates 'depth' for each state by incrementing for children that
                    // don't already have a depth calculated
                    if (!ourGraph_states[child_state]['depth']) {
                        ourGraph_states[child_state]['depth'] = current_state_obj['depth'] + 1;
                    }

                    //Add each viz.js edge/connection from predecessor to successor
                    networkEdgesList.push({
                        id: edge_name + "b%@%n" + branch_num.toString(),
                        from: current_edge_obj['predecessor'],
                        to: child_state,
                        label: edge_name,
                        font: {
                            align: 'horizontal'
                        },
                        title: current_edge_obj['action'],
                        arrows: {
                            to: {
                                scaleFactor: 2
                            }
                        },
                        color: {
                            inherit: 'to'
                        },
                        probability: current_edge_obj['successors'][child_state].probability
                    });
                } else {
                    console.error("child state not in nodes");;
                }
            }
        } else {
            console.error("predecessor state not in nodes");;
        }
    }

    document.getElementById('properties_form').innerHTML = document.getElementById('properties_form').innerHTML + "<br><h3 style='margin: 0px;''>To draw on edges:</h3>";
    addPropertyCheckbox("edge", "Edge ID");
    addPropertyCheckbox("edge", "Probability");

    for (property in current_edge_obj) {
        addPropertyCheckbox("edge", property);
    }

    finishProperties();


    //Update each viz.js state object with the level that we calculated while iterating edges
    for (name in networkNodesList) {
        current_state_obj = networkNodesList[name];
        current_state_obj['level'] = ourGraph_states[current_state_obj['id']]['depth'];
    }

    // create a network
    var container = document.getElementById('mynetwork');

    dataset = {
        nodes: networkNodesList,
        edges: networkEdgesList
    };

    network = new vis.Network(container, dataset, networkOptions);

    initProperties(ourGraph_settings);

    network.on("showPopup", function(params) {
        //  document.getElementById('output').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
    });

    network.on("click", function(params) {
        //  params.event = "[original event]";
        //  console.log(params);
        if (nodesFromJSON[params.nodes[0]]) {
            document.getElementById('output').innerHTML = syntaxHighlight(JSON.stringify(nodesFromJSON[params.nodes[0]], undefined, 4));
        } else if (params.edges[0]) {
            if (edgesFromJSON[params.edges[0].split("b%@%n")[0]]) {
                document.getElementById('output').innerHTML = syntaxHighlight(JSON.stringify(edgesFromJSON[params.edges[0].split("b%@%n")[0]], undefined, 4));

            }
        }

    });

    network.on("doubleClick", function(params) {
        console.log("doubleClick");
        console.log(params);
        ancestorsHighlight(params);
    });

    network.on("afterDrawing", function(ctx) {
        ctx.scale(1, 1);
        // var nodeId = 1;
        // var nodePosition = network.getPositions([nodeId]);
        // ctx.strokeStyle = '#294475';
        // ctx.lineWidth = 4;
        // ctx.fillStyle = '#A6D5F7';
        // ctx.circle(nodePosition[nodeId].x, nodePosition[nodeId].y, 20);
        ctx.fill();
        ctx.stroke();
    });


}


var highlightActive = false;
var dataset;

/**
 * Initialization function called 'onload' in order to setup UI listeners, jquery features, and instantiate networkOptions
 */
function ancestorsHighlight(params) {
    // if something is selected:
    if (params.nodes.length > 0) {
        var selectedNodeID = params.nodes[0];
        var selectedNode = ourGraph[selectedNodeID];

        var coloredNodeIDs = {}
        var hasParents = true;

        while (hasParents) {
            coloredNodeIDs[selectedNodeID] = "";
            hasParents = false;
            for (var key in selectedNode.parents) {
                // skip loop if the property is from prototype
                if (!selectedNode.parents.hasOwnProperty(key)) continue;

                selectedNodeID = key;
                selectedNode = ourGraph[selectedNodeID];
                hasParents = true;
                break;
            }
        }

        console.log(coloredNodeIDs);

        greyOutProbabilities(2);


        for (node in networkNodesList) {
            if (networkNodesList[node].id in coloredNodeIDs) {
                networkNodesList[node].color = networkNodesList[node].actualColor;

            }
        }

        resetNetwork();
    } else {
        resetColors();
    }
}
