var db;


function signup() {
    console.log("pressed signup button");
}

function login() {
    console.log("pressed login button");
}

var coverup, addOptions;

function showAddMenu(button) {
    var content = getChild(button.parentElement, "id", "content");
    content.innerHTML = "added event";
    coverup.style.display = "block";
    addOptions.style.display = "block";
}

function hideAddMenu() {
    coverup.style.display = "none";
    addOptions.style.display = "none";
}

function getChild(div, search, name) {
    var children = div.childNodes;
    if (search == "id") {
        for (i in children) {
            if (children[i].id == name) {
                console.log(children[i]);
                return children[i];
            }
        }
    }
    if (search == "tag") {
        for (i in children) {
            if (children[i].tagName == name) {
                console.log(children[i]);
                return children[i];
            }
        }
    }
}

function addDay(month, i) {
    var day = document.createElement('li');
    var span = document.createElement('span');
    var addButton = document.createElement('img');
    var content = document.createElement('div');
    day.className = "day";
    day.setAttribute('date', i);
    day.setAttribute('month', month);
    day.month = month;
    span.innerHTML = i;
    // span.className += 'active';
    addButton.className += "add-button";
    addButton.id = "button";
    addButton.src = "images/add2.png";
    content.id = "content";
    day.appendChild(span);
    day.appendChild(addButton);
    day.appendChild(content);
    return day;
}

function getLog() {
    db.get('log').then(function(doc) {
        // success
        console.log('found log doc');
        console.log(doc);
    }).catch(function(err) {
        if (err.name === 'not_found') {
            // conflict!
            console.log('**ERROR: doc not found - making new one');
            makeNewLogDoc();
        } else {
            // some other error
            console.log('**ERROR: unkown');
        }
    });
}

function makeNewLogDoc() {
    var doc = {
        "_id": "log"
    };
    db.put(doc);
}

function init() {

    db = new PouchDB('http://mdeyo.csail.mit.edu:5984/tracker_run');
    getLog();

    coverup = document.getElementById('coverup');
    addOptions = document.getElementById('addOptions');
    var days = document.getElementById('days');
    for (i = 0; i < 30; i++) {
        days.appendChild(addDay("august", i));
    }

    var classname = document.getElementsByClassName("day");

    var myFunction = function() {
        // console.log(this);
        // console.log(this.innerHTML);
        console.log('date:' + this.getAttribute("date"));
        // var dateSpan = document.createElement('span')
        // dateSpan.innerHTML = this.innerHTML;
        // dateSpan.className += "active";
        var button = this.getElementsByClassName('add-button')['button'];
        coverup.style.display = "block";
        console.log(coverup);
    };

    var getChild = function(div, search, name) {
        var children = div.childNodes;
        if (search == "id") {
            for (i in children) {
                if (children[i].id == name) {
                    console.log(children[i]);
                    return children[i];
                }
            }
        }
        if (search == "tag") {
            for (i in children) {
                if (children[i].tagName == name) {
                    console.log(children[i]);
                    return children[i];
                }
            }
        }
    }

    var addFunction = function() {
        console.log("button pressed");
        var date = this.parentElement.getAttribute("month") + " " + this.parentElement.getAttribute("date");
        console.log("date:" + date);
        showAddMenu(this);
    }

    for (var i = 0; i < classname.length; i++) {
        // classname[i].addEventListener('click', myFunction, false);
        if (classname[i].getElementsByClassName('add-button')['button']) {
            classname[i].getElementsByClassName('add-button')['button'].addEventListener('click', addFunction, false);
        }
    }

    $('#input-tags').selectize({
        delimiter: ',',
        // persist: false,
        // theme: 'links',
        // closeAfterSelect: true,
        maxItems: null,
        valueField: 'id',
        searchField: 'title',
        options: [{
                id: 1,
                title: 'Run',
                src: 'images/running-icon-5.png'
            }, {
                id: 2,
                title: 'Elliptical',
                url: 'http://google.com',
                src: 'images/elliptical-icon.png'
            }, {
                id: 3,
                title: 'Bike',
                url: 'http://yahoo.com',
                src: 'images/exercise-bike-icon.png'
            }, {
                id: 4,
                title: 'ATR',
                url: 'http://yahoo.com',
                src: 'images/health-icon.png'
            },

        ],
        render: {
            option: function(data, escape) {
                return '<div class="option">' +
                    '<span class="title">' + escape(data.title) + '</span>' +
                    // '<span class="url">' + escape(data.url) + '</span>' +
                    '</div>';
            },
            item: function(data, escape) {
                console.log(data.src);
                console.log(escape(data.src));
                if (!data.src) {
                    return '<div class="item"><img src="images/custom-icon.png" /><a> ' + escape(data.title) + '</a></div>';
                }

                return '<div class="item"><img src=' + escape(data.src) + ' /><a> ' + escape(data.title) + '</a></div>';
            }
        },
        create: function(input) {
            return {
                id: 0,
                title: input,
            };
        },
        onFocus: function() {
            console.log("onfocus!");
        },
        onBlur: function() {
            console.log("onblur!");
        }
    });
}
