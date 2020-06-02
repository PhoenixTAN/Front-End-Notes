// codepen
// we need a babel javascript complier/preprocessor
function Person() {
    return (
        <div className="person">
            <h1>Max</h1>
            <p>Your Age: 28</p>
        </div>
    );
}

ReactDOM.render(<Person />, document.getElementById("p1"));
