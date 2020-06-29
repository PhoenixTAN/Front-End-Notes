# Routing -- Multiple Pages in a SPA
Multiple Pages in a Single Page Application

re-rendered Single Page!

## Router Package
1. Parse URL/Path
2. Read Config
3. Render appropriate JSX

```
$ npm install --save react-router-dom
```


```javascript
import React, { Component } from 'react';
import Blog from './containers/Blog/Blog';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
```

```javascript
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />
            </div>
        );
    }
}

export default Blog;
```

- \<Route>
    1. exact意思是，path is exactly the same.
    2. 如果不加exact，任何以这个path开头的都可以render().
    3. 可以写多个\<Route>按顺序render.

- \<Link>
    1. 避免整个React项目在点击\<a>标签的href的时候，整个加载。
    2. hash可以在url后面加UID.
    3. search allows us to add queryParams.


用/<Route>来render component的时候，也传递了props.
1. history
2. location
3. match

这些参数并不会一层一层往下传，只会传到posts，如果我们想在下一层用，我们可以手动用props来传，也可以用一个HOC (higher order compnent) `withRouter`.

## withRouter HOC
例如，/<Route>里面render了/<Posts>，/<Posts>里面有多个/<Post>.
对/<Post>做如下工作，Post component的props里面就会有相应的参数。

```javascript
import React from 'react';
import {withRouter} from 'react-router-dom';
import './Post.css';

const post = (props) => {
    console.log('post', props);
    return (
        <article className="Post" onClick={props.clicked}>
            <h1>{props.title}</h1>
            <div className="Info">
                <div className="Author">{props.author}</div>
            </div>
        </article>
    );
};
export default withRouter(post);
```

## Absolute and relative path
Router传递的props里面有match.url
```javascript
<Link to={{
          pathname: this.props.match.url + '/new-post',
          hash: '#submit',
          search: '?quick-submit=true'
      }}>New Post</Link>
```

## Styling the Active Route -- navLink
我点一个导航栏链接，这个链接的CSS style就会变。

我们把刚刚的/<Link>换成/<NavLink>.
然后相应的导航栏\<a>标签，在被点击的时候，就会多了一个`class="active"`.

在CSS stylesheet里面设置这个class即可。
```javascript
<NavLink to="/" exact>Home</NavLink>
```

如果我想给active换个名字：
```javascript
<NavLink to="/" 
exact 
activeClassName="my-active"
activeStyle={{
  color: '#fa923f',
  textDecoration: 'underlline'
}}
>
Home
</NavLink>
```

## Extracting Route Parameters
```javascript
// Posts.js
<Link to={'/' + post.id} key={post.id}>
    <Post 
        title={post.title} 
        author={post.author}
        clicked={() => this.postSelectedHandler(post.id)} />
</Link>
```

```javascript
// Blog.js
<Route path="/" exact component={Posts} />
<Route path="/new-post" component={NewPost} />
<Route path="/:id" exact component={FullPost} />
```

```javascript
// FullPost.js
class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount () {
        console.log('FullPost props', this.props);  // id会传送到这里来
        console.log(this.props.match.params.id);
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                axios.get( '/posts/' + this.props.match.params.id )
                    .then( response => {
                        // console.log(response);
                        this.setState( { loadedPost: response.data } );
                    } );
            }
        }
    }
// ...
```

## Parsing Query Parameters & the Fragment
how do you extract search (also referred to as "query") **parameters** (=> ?something=somevalue  at the end of the URL)? 

How do you extract the fragment (=> #something  at the end of the URL)?

### Query Params
You can pass them easily like this:
```javascript
<Link to="/my-path?start=5">Go to Start</Link>
```
or
```javascript
<Link 
    to={‌{
        pathname: '/my-path',
        search: '?start=5'
    }}
    >Go to Start</Link>
```

React router makes it easy to get access to the search string: `props.location.search`.

But that will only give you something like ?start=5 

You probably want to get the key-value pair, without the ?  and the = . 

Here's a snippet which allows you to easily extract that information:
```javascript
componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        console.log(param); // yields ['start', '5']
    }
}
```

URLSearchParams  is a built-in object, shipping with vanilla JavaScript. 

When looping through query.entries() , you get arrays where the first element is the key name (e.g. start ) and the second element is the assigned value (e.g. 5 ).

### Fragment

You can pass it easily like this:
```javascript
<Link to="/my-path#start-position">Go to Start</Link>
```
or
```javascript
<Link 
    to={‌{
        pathname: '/my-path',
        hash: 'start-position'
    }}
    >Go to Start</Link>
```
React router makes it easy to extract the fragment. You can simply access props.location.hash .


## /<switch> to load a single page
只解析一个Route.按顺序解析。
```javascript
import {Switch} from 'react-router-dom';
<Switch>
    <Route path="/" exact component={Posts} />
    <Route path="/new-post" component={NewPost} />
    <Route path="/:id" exact component={FullPost} />
</Switch>
```

## Navigating Programatically

浏览器页面的前进后退，it is like a stack of page.
记得/<Route>会给render的component传递一个history的参数。

```javascript
// 不再用<Link to={'/' + post.id} key={post.id}>
postSelectedHandler = (id) => {
    console.log('Posts this props history', this.props.history);
    this.props.history.push({pathname: '/' + id});
}
```

## Nested Routes

## Redirecting Requests -- Redirect
如果用户想访问path="/"，你想让他实际上访问"/posts".
可以hard code.

```javascript
import {Redirect} from 'react-router-dom';
<Switch>
    <Route path="/new-post" component={NewPost} />
    <Route path="/posts" component={Posts} />
    <Redirect from="/" to="/posts">
</Switch>
```

### Conditional Redirection

在某个页面conditionally render a /<Redirect>.

```javascript
if (this.state.submitted) {
    redirect = <Redirect to="/posts" />
}
```

## Using the History Prop to Redirect (Replace)
- history.push
- history.replace


## Working with Guards
当用户登录了才能进入某些页面。
加个state.

## Handling the 404 Case (Unknown Routes)
不写路径。
```javascript
<Route render={()=><h1>Not Found</h1>}>
```

## Loading Routes Lazily
F12->Network

bundle.js很大，包含我们所有source code.

code splitting or lazy loading

### asyncComponent

### React Suspense
```javascript
import React, { Component, Suspense } from 'react';
const Posts = React.lazy(() => import('./containers/Posts'));

{this.state.showPosts ? (
    <Suspense fallback={<div>Loading...</div>}>
    <Posts />
    </Suspense>
) : (
    <User />
)}

```
