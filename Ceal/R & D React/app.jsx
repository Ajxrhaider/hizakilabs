var destination = document.queryselector("#container");
    
ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.body
);
 var destination = document.querySelector("#container");

ReactDOM.render(
    React.createElement(
        "h1", 
        null, 
        "Batman"),
    destination
);
 ReactDOM.render(
    <div>
        <h3><i>Batman</i></h3>
        <h3><i>Iron Man</i></h3>
        <h3><i>Nicholas Cage</i></h3>
        <h3><i>Mega Man</i></h3>
    </div>,
    destination
);
 ReactDOM.render(
    <div>
        <p>Hello, world</p>
    </div>,
    document.querySelector("#container")
);
var HelloWorld = React.createClass("#container");

ReactDOM.render(
    <div>
        <p>Hello, world</p>
    </div>,
    document.querySelector("#container")
);
var HelloWorld = React.createClass({
    render: function() {
        return (
            <p>Hello, world</p>
        );
    }
});

ReactDOM.render(
    <div>
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
    </div>,
    document.querySelector('#container')
);
var HelloWorld = React.createClass({
    render: function() {
        return (
            <p>Hello, world</p>
        );
    }
});

ReactDOM.render(
    <div>
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
    </div>,
    document.querySelector('#container')
);
var HelloWorld = React.createClass({
    render: function() {
        return (
            <p>Hello, world</p>
        );
    }
});

ReactDOM.render(
    <div>
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
        <HelloWorld />
    </div>,
    document.querySelector('#container')
);
 var HelloWorld = React.createClass({
    render: function() {
        return (
            <p>Hello, {this.props.greetTarget}!</p>
        );
    }
});

ReactDOM.render(
    <div>
        <HelloWorld greetTarget="Batman" />
        <HelloWorld greetTarget="Iron Man" />
        <HelloWorld greetTarget="Nicholas Cage" />
        <HelloWorld greetTarget="Mega Man" />
        <HelloWorld greetTarget="Bono" />
        <HelloWorld greetTarget="Catwoman" />
    </div>,
    document.querySelector('#container')
);
var CleverComponent = React.createClass({
    render: function() {
        return (
            <p>A, {this.props.foo}!</p>
        );
    }
});

ReactDOM.render(
    <div>
        <CleverComponent  foo="bar">
            <p>Sacre Bleu</p>
        </CleverComponent>
    </div>,
    document.querySelector('#container')
);
var BottanSama = React.createClass({
    render: function() {
        return (
            <button type={this.props.behavior}>{this.props.children}</button>
        );
    }
});

ReactDOM.render(
    <div>
        <BottanSama  behavior="submit">SEND DATA</BottanSama>
    </div>,
    document.querySelector('#container')
);
