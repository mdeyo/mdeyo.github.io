simpleJSON = {
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
            "action": "TURN_ON R1-MASTCAM",
            "predecessor": "node-0",
            "successors": {
                "node-1": {
                    "probability": 0.5
                },
                "node-2": {
                    "probability": 0.5
                }
            }
        },
        "edge-1": {
            "action": "FIX R1-MASTCAM",
            "predecessor": "node-2",
            "successors": {
                "node-3": {
                    "probability": 1.0
                }
            }
        }
    },
    "settings": {
        "nodes": {
            "display-properties": ["node_id", "value"],
            "color": "#99ccff",
            "terminal-color": "#7BE141"
        },
        "edges": {
            "display-properties": ["action", "probability"],
            "color": "#99ccff"
        },
        "hierarchical": "true",
        "nodeSpacing": 550,
        "levelSpacing": 200,
        "color": "blue"
    }
}

lowRiskJSON = {
    "nodes": {
        "node-0": {
            "state": "location:R1, timestep:1, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.01,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 14.05231,
            "is-goal": "NIL"
        },
        "node-1": {
            "state": "location:R1, timestep:2, velocity:STOPPED crashed:NIL",
            "acceptable-risk-ub": 0.01,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 10.05231,
            "is-goal": "NIL"
        },
        "node-2": {
            "state": "location:R2, timestep:3, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 0.01,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 8.05231,
            "is-goal": "NIL"
        },
        "node-3": {
            "state": "location:R3, timestep:4, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 0.01,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 6.05231,
            "is-goal": "NIL"
        },
        "node-4": {
            "state": "location:R4, timestep:5, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 0.01,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 4.05231,
            "is-goal": "NIL"
        },
        "node-5": {
            "state": "location:L5, timestep:6, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.011111111,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.0279999,
            "is-goal": "NIL"
        },
        "node-6": {
            "state": "location:R5, timestep:6, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.099999994,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.2711,
            "is-goal": "NIL"
        },
        "node-7": {
            "state": "location:L6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.11111111,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.19,
            "is-goal": "NIL"
        },
        "node-8": {
            "state": "location:R6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.99999994,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.001,
            "is-goal": "NIL"
        },
        "node-9": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-10": {
            "state": "location:R7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.01,
            "is-goal": "NIL"
        },
        "node-11": {
            "state": "location:R9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-12": {
            "state": "location:R8, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-13": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-14": {
            "state": "location:R9, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-15": {
            "state": "location:G, timestep:11, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-16": {
            "state": "location:G, timestep:11, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-17": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-18": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-19": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-20": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.1234568,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-21": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-22": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-23": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.13717423,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-24": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-25": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-26": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-27": {
            "state": "location:L7, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.01234568,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.01,
            "is-goal": "NIL"
        },
        "node-28": {
            "state": "location:L6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.11111111,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.19,
            "is-goal": "NIL"
        },
        "node-29": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.1234568,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-30": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-31": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-32": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.13717423,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-33": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-34": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-35": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-36": {
            "state": "location:L9, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.013717423,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-37": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.1234568,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-38": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.13717423,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-39": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-40": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-41": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-42": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.015241582,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-43": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.13717423,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        }
    },
    "edges": {
        "edge-0": {
            "action": "STOP",
            "predecessor": "node-0",
            "successors": {
                "node-1": {
                    "probability": 1
                }
            }
        },
        "edge-1": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-1",
            "successors": {
                "node-2": {
                    "probability": 1
                }
            }
        },
        "edge-2": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-2",
            "successors": {
                "node-3": {
                    "probability": 1
                }
            }
        },
        "edge-3": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-3",
            "successors": {
                "node-4": {
                    "probability": 1
                }
            }
        },
        "edge-4": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-4",
            "successors": {
                "node-5": {
                    "probability": 0.9
                },
                "node-6": {
                    "probability": 0.1
                }
            }
        },
        "edge-5": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-6",
            "successors": {
                "node-7": {
                    "probability": 0.9
                },
                "node-8": {
                    "probability": 0.1
                }
            }
        },
        "edge-6": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-8",
            "successors": {
                "node-9": {
                    "probability": 0.9
                },
                "node-10": {
                    "probability": 0.1
                }
            }
        },
        "edge-7": {
            "action": "FORWARD",
            "predecessor": "node-10",
            "successors": {
                "node-11": {
                    "probability": 0.9
                },
                "node-12": {
                    "probability": 0.1
                }
            }
        },
        "edge-8": {
            "action": "FORWARD",
            "predecessor": "node-12",
            "successors": {
                "node-13": {
                    "probability": 0.9
                },
                "node-14": {
                    "probability": 0.1
                }
            }
        },
        "edge-9": {
            "action": "FORWARD",
            "predecessor": "node-14",
            "successors": {
                "node-15": {
                    "probability": 0.9
                },
                "node-16": {
                    "probability": 0.1
                }
            }
        },
        "edge-10": {
            "action": "FORWARD",
            "predecessor": "node-11",
            "successors": {
                "node-17": {
                    "probability": 0.9
                },
                "node-18": {
                    "probability": 0.1
                }
            }
        },
        "edge-11": {
            "action": "FORWARD-FAST",
            "predecessor": "node-9",
            "successors": {
                "node-19": {
                    "probability": 1.0
                }
            }
        },
        "edge-12": {
            "action": "FORWARD",
            "predecessor": "node-7",
            "successors": {
                "node-20": {
                    "probability": 0.9
                },
                "node-21": {
                    "probability": 0.1
                }
            }
        },
        "edge-13": {
            "action": "FORWARD-FAST",
            "predecessor": "node-21",
            "successors": {
                "node-22": {
                    "probability": 1.0
                }
            }
        },
        "edge-14": {
            "action": "FORWARD",
            "predecessor": "node-20",
            "successors": {
                "node-23": {
                    "probability": 0.9
                },
                "node-24": {
                    "probability": 0.1
                }
            }
        },
        "edge-15": {
            "action": "FORWARD",
            "predecessor": "node-24",
            "successors": {
                "node-25": {
                    "probability": 0.9
                },
                "node-26": {
                    "probability": 0.1
                }
            }
        },
        "edge-16": {
            "action": "FORWARD",
            "predecessor": "node-5",
            "successors": {
                "node-27": {
                    "probability": 0.9
                },
                "node-28": {
                    "probability": 0.1
                }
            }
        },
        "edge-17": {
            "action": "FORWARD",
            "predecessor": "node-28",
            "successors": {
                "node-29": {
                    "probability": 0.9
                },
                "node-30": {
                    "probability": 0.1
                }
            }
        },
        "edge-18": {
            "action": "FORWARD-FAST",
            "predecessor": "node-30",
            "successors": {
                "node-31": {
                    "probability": 1.0
                }
            }
        },
        "edge-19": {
            "action": "FORWARD",
            "predecessor": "node-29",
            "successors": {
                "node-32": {
                    "probability": 0.9
                },
                "node-33": {
                    "probability": 0.1
                }
            }
        },
        "edge-20": {
            "action": "FORWARD",
            "predecessor": "node-33",
            "successors": {
                "node-34": {
                    "probability": 0.9
                },
                "node-35": {
                    "probability": 0.1
                }
            }
        },
        "edge-21": {
            "action": "FORWARD",
            "predecessor": "node-27",
            "successors": {
                "node-36": {
                    "probability": 0.9
                },
                "node-37": {
                    "probability": 0.1
                }
            }
        },
        "edge-22": {
            "action": "FORWARD",
            "predecessor": "node-37",
            "successors": {
                "node-38": {
                    "probability": 0.9
                },
                "node-39": {
                    "probability": 0.1
                }
            }
        },
        "edge-23": {
            "action": "FORWARD",
            "predecessor": "node-39",
            "successors": {
                "node-40": {
                    "probability": 0.9
                },
                "node-41": {
                    "probability": 0.1
                }
            }
        },
        "edge-24": {
            "action": "FORWARD",
            "predecessor": "node-36",
            "successors": {
                "node-42": {
                    "probability": 0.9
                },
                "node-43": {
                    "probability": 0.1
                }
            }
        }
    },
    "settings": {
        "nodes": {
            "display-properties": ["probability"]
        },
        "edges": {
            "display-properties": ["probability", "action"]
        },
        "hierarchical": "true",
        "nodeSpacing": 200,
        "levelSpacing": 100,
        "color": "blue"
    }
};

highRiskJSON = {
    "nodes": {
        "node-0": {
            "state": "location:R1, timestep:1, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.9,
            "execution-risk-bound": [0.4968477, 1.0],
            "state-risk": 0,
            "value": 9.189681,
            "is-goal": "NIL"
        },
        "node-1": {
            "state": "location:R3, timestep:2, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.90000004,
            "execution-risk-bound": [0.45205298, 1.0],
            "state-risk": 0,
            "value": 7.867923,
            "is-goal": "NIL"
        },
        "node-2": {
            "state": "location:R2, timestep:2, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.9, 1.0],
            "state-risk": 0,
            "value": 11.085502,
            "is-goal": "NIL"
        },
        "node-3": {
            "state": "location:L3, timestep:3, velocity:AVERAGE crashed:T",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [1, 1],
            "state-risk": 1,
            "value": 10.0,
            "is-goal": "T"
        },
        "node-4": {
            "state": "location:R3, timestep:3, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 10.85502,
            "is-goal": "NIL"
        },
        "node-5": {
            "state": "location:R3, timestep:4, velocity:STOPPED crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 6.8550196,
            "is-goal": "NIL"
        },
        "node-6": {
            "state": "location:R4, timestep:5, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 4.8550196,
            "is-goal": "NIL"
        },
        "node-7": {
            "state": "location:L5, timestep:6, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.9199,
            "is-goal": "NIL"
        },
        "node-8": {
            "state": "location:R5, timestep:6, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.2711,
            "is-goal": "NIL"
        },
        "node-9": {
            "state": "location:L6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.19,
            "is-goal": "NIL"
        },
        "node-10": {
            "state": "location:R6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.001,
            "is-goal": "NIL"
        },
        "node-11": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-12": {
            "state": "location:R7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.01,
            "is-goal": "NIL"
        },
        "node-13": {
            "state": "location:R9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-14": {
            "state": "location:R8, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-15": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-16": {
            "state": "location:R9, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-17": {
            "state": "location:G, timestep:11, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-18": {
            "state": "location:G, timestep:11, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-19": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-20": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-21": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-22": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-23": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-24": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-25": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-26": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-27": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-28": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-29": {
            "state": "location:R6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.001,
            "is-goal": "NIL"
        },
        "node-30": {
            "state": "location:L6, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.19,
            "is-goal": "NIL"
        },
        "node-31": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-32": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-33": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-34": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-35": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-36": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-37": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-38": {
            "state": "location:L7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-39": {
            "state": "location:R7, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.01,
            "is-goal": "NIL"
        },
        "node-40": {
            "state": "location:R9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-41": {
            "state": "location:R8, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-42": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-43": {
            "state": "location:R9, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-44": {
            "state": "location:G, timestep:11, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-45": {
            "state": "location:G, timestep:11, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-46": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-47": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-48": {
            "state": "location:G, timestep:9, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-49": {
            "state": "location:L4, timestep:3, velocity:AVERAGE crashed:T",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [1, 1],
            "state-risk": 1,
            "value": 10.0,
            "is-goal": "T"
        },
        "node-50": {
            "state": "location:L4, timestep:3, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 0.82953155,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 4.0,
            "is-goal": "NIL"
        },
        "node-51": {
            "state": "location:R4, timestep:3, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.92052996, 1.0],
            "state-risk": 0,
            "value": 11.079227,
            "is-goal": "NIL"
        },
        "node-52": {
            "state": "location:L5, timestep:4, velocity:AVERAGE crashed:T",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [1, 1],
            "state-risk": 1,
            "value": 10.0,
            "is-goal": "T"
        },
        "node-53": {
            "state": "location:R5, timestep:4, velocity:AVERAGE crashed:T",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [1, 1],
            "state-risk": 1,
            "value": 10.0,
            "is-goal": "T"
        },
        "node-54": {
            "state": "location:R5, timestep:4, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.117, 1.0],
            "state-risk": 0,
            "value": 10.8803,
            "is-goal": "NIL"
        },
        "node-55": {
            "state": "location:R5, timestep:5, velocity:STOPPED crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.117, 1.0],
            "state-risk": 0,
            "value": 6.8802996,
            "is-goal": "NIL"
        },
        "node-56": {
            "state": "location:R6, timestep:6, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.117, 1.0],
            "state-risk": 0,
            "value": 4.8802996,
            "is-goal": "NIL"
        },
        "node-57": {
            "state": "location:L7, timestep:7, velocity:AVERAGE crashed:T",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [1, 1],
            "state-risk": 1,
            "value": 10.0,
            "is-goal": "T"
        },
        "node-58": {
            "state": "location:L7, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.1,
            "is-goal": "NIL"
        },
        "node-59": {
            "state": "location:R7, timestep:7, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.27, 1.0],
            "state-risk": 0,
            "value": 4.693,
            "is-goal": "NIL"
        },
        "node-60": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:T",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [1, 1],
            "state-risk": 1,
            "value": 10.0,
            "is-goal": "T"
        },
        "node-61": {
            "state": "location:L8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-62": {
            "state": "location:R8, timestep:8, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 3.0,
            "is-goal": "NIL"
        },
        "node-63": {
            "state": "location:R9, timestep:9, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-64": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-65": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-66": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-67": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-68": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-69": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-70": {
            "state": "location:L8, timestep:8, velocity:SLOW crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.1,
            "is-goal": "NIL"
        },
        "node-71": {
            "state": "location:G, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-72": {
            "state": "location:L9, timestep:9, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 1.0,
            "is-goal": "NIL"
        },
        "node-73": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-74": {
            "state": "location:G, timestep:10, velocity:AVERAGE crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        },
        "node-75": {
            "state": "location:L7, timestep:4, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0.0, 1.0],
            "state-risk": 0,
            "value": 2.0,
            "is-goal": "NIL"
        },
        "node-76": {
            "state": "location:G, timestep:5, velocity:FAST crashed:NIL",
            "acceptable-risk-ub": 1.0,
            "execution-risk-bound": [0, 1.0],
            "state-risk": 0,
            "value": 0.0,
            "is-goal": "T"
        }
    },
    "edges": {
        "edge-0": {
            "action": "FORWARD",
            "predecessor": "node-0",
            "successors": {
                "node-1": {
                    "probability": 0.9
                },
                "node-2": {
                    "probability": 0.1
                }
            }
        },
        "edge-1": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-2",
            "successors": {
                "node-3": {
                    "probability": 0.9
                },
                "node-4": {
                    "probability": 0.1
                }
            }
        },
        "edge-2": {
            "action": "STOP",
            "predecessor": "node-4",
            "successors": {
                "node-5": {
                    "probability": 1
                }
            }
        },
        "edge-3": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-5",
            "successors": {
                "node-6": {
                    "probability": 1
                }
            }
        },
        "edge-4": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-6",
            "successors": {
                "node-7": {
                    "probability": 0.9
                },
                "node-8": {
                    "probability": 0.1
                }
            }
        },
        "edge-5": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-8",
            "successors": {
                "node-9": {
                    "probability": 0.9
                },
                "node-10": {
                    "probability": 0.1
                }
            }
        },
        "edge-6": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-10",
            "successors": {
                "node-11": {
                    "probability": 0.9
                },
                "node-12": {
                    "probability": 0.1
                }
            }
        },
        "edge-7": {
            "action": "FORWARD",
            "predecessor": "node-12",
            "successors": {
                "node-13": {
                    "probability": 0.9
                },
                "node-14": {
                    "probability": 0.1
                }
            }
        },
        "edge-8": {
            "action": "FORWARD",
            "predecessor": "node-14",
            "successors": {
                "node-15": {
                    "probability": 0.9
                },
                "node-16": {
                    "probability": 0.1
                }
            }
        },
        "edge-9": {
            "action": "FORWARD",
            "predecessor": "node-16",
            "successors": {
                "node-17": {
                    "probability": 0.9
                },
                "node-18": {
                    "probability": 0.1
                }
            }
        },
        "edge-10": {
            "action": "FORWARD",
            "predecessor": "node-13",
            "successors": {
                "node-19": {
                    "probability": 0.9
                },
                "node-20": {
                    "probability": 0.1
                }
            }
        },
        "edge-11": {
            "action": "FORWARD-FAST",
            "predecessor": "node-11",
            "successors": {
                "node-21": {
                    "probability": 1.0
                }
            }
        },
        "edge-12": {
            "action": "FORWARD",
            "predecessor": "node-9",
            "successors": {
                "node-22": {
                    "probability": 0.9
                },
                "node-23": {
                    "probability": 0.1
                }
            }
        },
        "edge-13": {
            "action": "FORWARD-FAST",
            "predecessor": "node-23",
            "successors": {
                "node-24": {
                    "probability": 1.0
                }
            }
        },
        "edge-14": {
            "action": "FORWARD",
            "predecessor": "node-22",
            "successors": {
                "node-25": {
                    "probability": 0.9
                },
                "node-26": {
                    "probability": 0.1
                }
            }
        },
        "edge-15": {
            "action": "FORWARD",
            "predecessor": "node-26",
            "successors": {
                "node-27": {
                    "probability": 0.9
                },
                "node-28": {
                    "probability": 0.1
                }
            }
        },
        "edge-16": {
            "action": "CHANGE-LANE-RIGHT",
            "predecessor": "node-7",
            "successors": {
                "node-29": {
                    "probability": 0.9
                },
                "node-30": {
                    "probability": 0.1
                }
            }
        },
        "edge-17": {
            "action": "FORWARD",
            "predecessor": "node-30",
            "successors": {
                "node-31": {
                    "probability": 0.9
                },
                "node-32": {
                    "probability": 0.1
                }
            }
        },
        "edge-18": {
            "action": "FORWARD-FAST",
            "predecessor": "node-32",
            "successors": {
                "node-33": {
                    "probability": 1.0
                }
            }
        },
        "edge-19": {
            "action": "FORWARD",
            "predecessor": "node-31",
            "successors": {
                "node-34": {
                    "probability": 0.9
                },
                "node-35": {
                    "probability": 0.1
                }
            }
        },
        "edge-20": {
            "action": "FORWARD",
            "predecessor": "node-35",
            "successors": {
                "node-36": {
                    "probability": 0.9
                },
                "node-37": {
                    "probability": 0.1
                }
            }
        },
        "edge-21": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-29",
            "successors": {
                "node-38": {
                    "probability": 0.9
                },
                "node-39": {
                    "probability": 0.1
                }
            }
        },
        "edge-22": {
            "action": "FORWARD",
            "predecessor": "node-39",
            "successors": {
                "node-40": {
                    "probability": 0.9
                },
                "node-41": {
                    "probability": 0.1
                }
            }
        },
        "edge-23": {
            "action": "FORWARD",
            "predecessor": "node-41",
            "successors": {
                "node-42": {
                    "probability": 0.9
                },
                "node-43": {
                    "probability": 0.1
                }
            }
        },
        "edge-24": {
            "action": "FORWARD",
            "predecessor": "node-43",
            "successors": {
                "node-44": {
                    "probability": 0.9
                },
                "node-45": {
                    "probability": 0.1
                }
            }
        },
        "edge-25": {
            "action": "FORWARD",
            "predecessor": "node-40",
            "successors": {
                "node-46": {
                    "probability": 0.9
                },
                "node-47": {
                    "probability": 0.1
                }
            }
        },
        "edge-26": {
            "action": "FORWARD-FAST",
            "predecessor": "node-38",
            "successors": {
                "node-48": {
                    "probability": 1.0
                }
            }
        },
        "edge-27": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-1",
            "successors": {
                "node-49": {
                    "probability": 0.35999998
                },
                "node-50": {
                    "probability": 0.54
                },
                "node-51": {
                    "probability": 0.1
                }
            }
        },
        "edge-28": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-51",
            "successors": {
                "node-52": {
                    "probability": 0.9
                },
                "node-53": {
                    "probability": 0.010000001
                },
                "node-54": {
                    "probability": 0.089999996
                }
            }
        },
        "edge-29": {
            "action": "STOP",
            "predecessor": "node-54",
            "successors": {
                "node-55": {
                    "probability": 1
                }
            }
        },
        "edge-30": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-55",
            "successors": {
                "node-56": {
                    "probability": 1
                }
            }
        },
        "edge-31": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-56",
            "successors": {
                "node-57": {
                    "probability": 0.089999996
                },
                "node-58": {
                    "probability": 0.80999994
                },
                "node-59": {
                    "probability": 0.1
                }
            }
        },
        "edge-32": {
            "action": "CHANGE-LANE-LEFT",
            "predecessor": "node-59",
            "successors": {
                "node-60": {
                    "probability": 0.27
                },
                "node-61": {
                    "probability": 0.63
                },
                "node-62": {
                    "probability": 0.1
                }
            }
        },
        "edge-33": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-62",
            "successors": {
                "node-63": {
                    "probability": 1
                }
            }
        },
        "edge-34": {
            "action": "FORWARD",
            "predecessor": "node-63",
            "successors": {
                "node-64": {
                    "probability": 0.9
                },
                "node-65": {
                    "probability": 0.1
                }
            }
        },
        "edge-35": {
            "action": "FORWARD",
            "predecessor": "node-61",
            "successors": {
                "node-66": {
                    "probability": 0.9
                },
                "node-67": {
                    "probability": 0.1
                }
            }
        },
        "edge-36": {
            "action": "FORWARD",
            "predecessor": "node-67",
            "successors": {
                "node-68": {
                    "probability": 0.9
                },
                "node-69": {
                    "probability": 0.1
                }
            }
        },
        "edge-37": {
            "action": "FORWARD-SLOW",
            "predecessor": "node-58",
            "successors": {
                "node-70": {
                    "probability": 1
                }
            }
        },
        "edge-38": {
            "action": "FORWARD",
            "predecessor": "node-70",
            "successors": {
                "node-71": {
                    "probability": 0.9
                },
                "node-72": {
                    "probability": 0.1
                }
            }
        },
        "edge-39": {
            "action": "FORWARD",
            "predecessor": "node-72",
            "successors": {
                "node-73": {
                    "probability": 0.9
                },
                "node-74": {
                    "probability": 0.1
                }
            }
        },
        "edge-40": {
            "action": "FORWARD-FAST",
            "predecessor": "node-50",
            "successors": {
                "node-75": {
                    "probability": 1.0
                }
            }
        },
        "edge-41": {
            "action": "FORWARD-FAST",
            "predecessor": "node-75",
            "successors": {
                "node-76": {
                    "probability": 1.0
                }
            }
        }
    },
    "settings": {
        "nodes": {
            "display-properties": ["probability"]
        },
        "edges": {
            "display-properties": ["probability", "action"]
        },
        "hierarchical": "true",
        "nodeSpacing": 200,
        "levelSpacing": 100,
        "color": "blue"
    }
};
