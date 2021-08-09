
import './App.css';
import React, { Component } from 'react';
import Toc from "./component/TOC";
import ReadContent from './component/ReadContent';
import Subject from './component/Subject';
import UpdateContent from './component/UpdateContent';
import Control from './component/Control';
import CreateContent from './component/CreateContent';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selectde_content_id:1,
      Subject:{title:'WEB',sub:'world wide web!'},
      Welcome:{title:'Welcome', desc:'Hello React!'},
      contents:[
        {id:1, title: 'HTML', desc:'HTML is HyperText ...'},
        {id:2, title: 'CSS', desc:'CSS is for design'},
        {id:3, title: 'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i =0;
    while(i< this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id ===this.state.selectde_content_id){
        return data;
        break;
      }
      i = i+1;
    }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'Welcome'){
      _title = this.state.Welcome.title;
      _desc = this.state.Welcome.desc;
      _article = <ReadContent title= {_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title= {_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode ==='create'){
      _article = <CreateContent onSubmit = {function(_title,_desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc: _desc});
        this.setState({
          contents:_contents,
          mode:'read',
          selectde_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode ==='update'){
      _content = this.getReadContent();
      _article = <UpdateContent data = {_content} onSubmit =
       {function(_id,_title,_desc){
        var _contents = Array.from(this.state.contents);
        var i=0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id: _id, title: _title, desc:_desc};
            break;
          }
          i = i+1;
        }
        this.setState({
          contents:_contents,
          mode: 'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render(){
    return (
    <div className="App">
     <Subject
     title={this.state.Subject.title} 
     sub={this.state.Subject.sub}
     onChangePage = {function(){
       this.setState({mode:'Welcome'})
     }.bind(this)}
     >
     </Subject>
     <Toc 
     onChangePage={function(id){
      this.setState({
        mode:'read',
        selectde_content_id:Number(id)
    });
     }.bind(this)}
      data={this.state.contents}></Toc>
<Control onChangeMode = {function(_mode){
  if(_mode ==='delete'){
    if(window.confirm('Really?')){
      var _contents = Array.from(this.state.contents);
      var i =0;
      while(i<_contents.length){
        if(_contents[i].id === this.state.selectde_content_id){
          _contents.splice(i,1);
          break;
        }
        i=i+1;
      }
        this.setState({
          mode: 'welcome',
          contents: _contents
        });
      alert('Deleted');
    }
  }else{
    this.setState({
      mode: _mode
    });
  }
}.bind(this)}></Control>
{this.getContent()}
    </div>
    );
  }
}

export default App;
