import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Layout, Menu, Breadcrumb, Icon,Drawer,Tooltip
} from 'antd';

/*载入数据文件*/
var A = require('./js/adA.js');
var B = require('./js/adB.js');
var C = require('./js/adC.js');
var D = require('./js/adD.js');
var E = require('./js/adE.js');
var F = require('./js/adF.js');
var G = require('./js/adG.js');
const {
  Header, Content, Footer, Sider,
} = Layout;

const SubMenu = Menu.SubMenu;




class App extends Component {


  state = {
    collapsed: false,
    ad_type:[
    {type:"ALL",bgmap:1,id:'ALL',color:'all'},
    {type:"A 广场活动",bgmap:1,id:'A',color:'green'},
    {type:"B 大型墙体",bgmap:1,id:'B',color:'blue'},
    {type:"C 落地广告",bgmap:1,id:'C',color:'#8C0044 '},
    {type:"D B1灯箱",bgmap:2,id:'D',color:'DarkSlateGray'},
    {type:"E 精神柱",bgmap:1,id:'E',color:'Indigo  '},
    {type:"F 路面刀旗",bgmap:1,id:'F',color:'Orange '},
    {type:"G 发光字",bgmap:1,id:'G',color:'Tomato '},
  ],
    bgimg:"bg.jpg",
    current_type:[],
    spirt_x:0,
    spirt_y:0,
    spirt_percent_x:0,
    spirt_percent_y:0,
    pointcss:"",
    drawerVisible:false,
    current_point:[],
    mouseON:[],
    current_bg:"",
  };

  onCollapse = (collapsed) => {
    //console.log(collapsed);
    this.setState({ collapsed });

  }

/*当按下左侧按钮时 */
  leftMenuOnclick(type){
    //console.info(type);
    let bgmap="bg"+type.bgmap;
  //  console.info(bgmap);
    let objs=[];
    switch(type.id){
      /*当all时将所有添加到objs中*/
      case('ALL'):
      objs=A.items.concat(B.items)
      .concat(C.items)
      .concat(D.items)
      .concat(E.items)
      .concat(F.items)
      .concat(G.items);break;
      case('A'):objs=A.items;break;
      case('B'):objs=B.items;break;
      case('C'):objs=C.items;break;
      case('D'):objs=D.items;break;
      case('E'):objs=E.items;break;
      case('F'):objs=F.items;break;
      case('G'):objs=G.items;break;
    }
    console.info(bgmap);
    this.setState({bgimg:bgmap,current_type:objs});
  }


  MouseMoveAction(e){
  //  console.info(e.screenX,e.screenY);
    var obj = document.getElementById("bg").getBoundingClientRect();
    //console.info(obj.top,obj.bottom);
    this.setState(
      {spirt_x:e.screenX,
        spirt_y:e.screenY,
        spirt_percent_x:Math.floor((e.screenX-obj.left)/(obj.right-obj.left)*1000)/10,
        spirt_percent_y:Math.floor((e.screenY-148)/(obj.bottom-obj.top)*1000)/10
      }
    );

  //  console.info(obj.left,obj.right,obj.top,obj.bottom);

  }
  /*鼠标进入point触发方*/
  MouseEnter(item){
    this.setState({current_point:item,mouseON:item});
    //console.info('mouse enter action',item)
  }
  /*鼠标按下的事件*/
  MouseClick(item){
      this.setState({current_point:item,drawerVisible:true  });
    //  console.info('click action',this.state.current_point,item);
  }
/*鼠标离开point触发方法*/
  MouseLeave(e){
  //  console.info(e.screenX,e.screenY);
  this.setState({mouseON:[]});
  //  console.info('leave action',e);
  }
  /*当关闭右侧按钮时*/
  onDrawerClose = () => {
    this.setState({
      current_point:[],
      drawerVisible: false,
    });
  };


/*渲染函数*/
  render() {
    var imgUrl="img\/A1.jpg"
    let that = this;
    return (
      <Layout style={{ minHeight: '100vh' }} >
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">


            <SubMenu
              key="sub1"
              title={<span><Icon type="dot-chart" /><span>advertise</span></span>}
            >

              {
                this.state.ad_type.map(function(item,i){
                  return(
                    <Menu.Item key={item.id}  onClick={that.leftMenuOnclick.bind(that,item)} >
                      <Icon type="folder" theme="twoTone" twoToneColor={item.color}/>{item.type}
                    </Menu.Item>
                  )
                })
              }
            </SubMenu>
          </Menu>
        </Sider>



        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>map</Breadcrumb.Item>
              <Breadcrumb.Item>now location:x_{this.state.spirt_x},y_{this.state.spirt_y}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.spirt_percent_x}%,{this.state.spirt_percent_y}%</Breadcrumb.Item>

            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div id="bg" style={{backgroundImage:'url('+"http://192.168.3.17/AD/"+this.state.bgimg+".jpg"+')'}}
                onMouseMove={that.MouseMoveAction.bind(that)}>

                {this.state.current_type.map(function(item,key){
                  return (

                    <div key={key}
                      style={{left:item.x+"%",top:item.y+"%",position:'absolute'}}
                     onMouseOver={that.MouseEnter.bind(that,item)}
                     onMouseLeave={that.MouseLeave.bind(that,item)}
                     onClick={that.MouseClick.bind(that,item)}
                     >
                        <Tooltip placement="top" title={item.name2}>
                         <div className={(item.name==that.state.mouseON.name)?("selectPoint circle"):(" circle")}
                         style={{ width:item.size,height:item.size,
                                  backgroundColor:item.color,
                                  color:item.color}}>
                         </div>
                         </Tooltip>
                         <div className={"point-text"} style={{color:item.color}}>
                           {item.name}
                         </div>
                    </div>

                  )
                })

              }



              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            designed by 尤小伟  powered by 蚂蚁金服.antd & facebook.react
          </Footer>

          <Drawer
          width={400}
          title={this.state.current_point.name2}
          placement="right"
          closable={true}
          onClose={this.onDrawerClose}
          visible={this.state.drawerVisible}
        >
        <p>ID:{this.state.current_point.name}</p>


          <div ref="ImgDiv" style=
          {{width:350,height:175,
            backgroundSize:'100% 100%',
            backgroundImage:'url('+"http://192.168.3.17/AD/"+this.state.current_point.name+".jpg"+')'}}></div>
          <p>价格:{this.state.current_point.price}</p>
          <p>信息:{this.state.current_point.info}</p>
        </Drawer>


        </Layout>
      </Layout>
    );
  }

}

export default App;
