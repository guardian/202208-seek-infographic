import {h, Component} from "preact";
import * as am5 from "@amcharts/amcharts5/index";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect, useRef } from "preact/hooks";
import { setTheme } from "./store";
import { useDispatch } from "react-redux";
// import data from "./chartData";

const screenType = () => {
  return screen.availWidth > 800 ? 'desktop': 'mobile';
}


const BubbleChart = ({data, onSelect, showChildren = false, id}) => {

  const chartEl = useRef();

  const config = {
    minRadius: {
      mobile: 10,
      desktop: 6,
    },
    maxRadius: {
      mobile: 15,
      desktop: 12
    },
    fontSize: {
      desktop: 20,
      mobile: 10
    },
    nodePadding: {
      mobile: 5,
      desktop: 20,
    },
    circleFill: '#4964E9'
  }

    useLayoutEffect(()=>{
        const root = am5.Root.new(chartEl.current);
        console.log('bubble chart')
        
        // const dispatch = useDispatch();

        root.setThemes([
            am5animated.new(root)
        ]);

        const container = root.container.children.push(am5.Container.new(root, {
            width: am5.percent(100),
            height: am5.percent(100),
            layout: root.verticalLayout
        }));        

        const series = container.children.push(am5hierarchy.ForceDirected.new(root, {
            singleBranchOnly: true,
            downDepth:  showChildren ? 1 : 0,
            topDepth: 1,
            initialDepth: 0,
            valueField: "value",
            categoryField: "name",
            childDataField: "children",
            idField: "name",
            linkWithField: "linkWith",
            manyBodyStrength: .2,
            centerStrength: .4,
            // toggleKey: "none",
            minRadius: am5.percent(config.minRadius[screenType()]),
            maxRadius: am5.percent(config.maxRadius[screenType()]),
            showOnFrame: 1,
            velocityDecay: 0.6,
            // nodePadding: am5.percent(2)
            nodePadding: config.nodePadding[screenType()]
          }));
          series.nodes.template.events.on("click", function(e) {
            // console.log(e.target._dataItem.dataContext.key)
            if (e.target._dataItem.dataContext.isChild) return;
            // dispatch( setTheme(e.target._dataItem.dataContext.key));
            onSelect(id, (e.target._dataItem.dataContext.id));
          })
        //   https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-node-colors/
          series.get("colors").setAll({
            step: 2
          });

          series.outerCircles.template.setAll({
            strokeWidth: 2,
            strokeColor: '#4964e9'
          });
        //   https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/#Label_content
          series.labels.template.setAll({
            // text: "{name}\n[bold]{value}[/]",
            // text: "11 {value} - {name}",
            fontFamily: "Display Sans",
            fontSize: config.fontSize[screenType()],
            // breakWords: true,
            html:"<p class='bubble-node' style='text-align:center;'><strong>{value}</strong><br>{name}</p>"
          });          
        //   series.tooltip.template.forceHidden = (true);
        // https://www.amcharts.com/demos/force-directed-adding-links/
        series.nodes.template.setAll({
            tooltipText: null,
            // cursorOverStyle: "pointer"
          });
        // series.get("colors").set("colors", [
        //     am5.color(0x095256),
        //     am5.color(0x087f8c),
        //     am5.color(0x5aaa95),
        //     am5.color(0x86a873),
        //     am5.color(0xbb9f06)
        //   ]);
        //   series.nodes.template.set('tooltipText', "{name}")
          // series.labels.template.setAll({
          //     text: '{value} {name}'
          // })

        series.circles.template.adapters.add("fill", function(fill, target) {
            // console.log('>>>', target._dataItem.dataContext)
            // if (target._dataItem.dataContext.isChild === false) {
            //     return am5.color(parseInt(target._dataItem.dataContext.color.replace('#',''),16));
            // }

            return config.circleFill;
            
          });          
          series.outerCircles.template.states.create("disabled", {
            // fillOpacity: 0.5,
            strokeOpacity: 0.2,
            strokeDasharray: 10,
            strokeColor: config.circleFill,
            fillColor: config.circleFill,
            stroke: config.circleFill,
            strokeWidth: 1,
            scale: .96,
          });
          series.outerCircles.template.states.create("default", {
            // fillOpacity: 0.5,
            strokeOpacity: 0.2,
            strokeDasharray: 10,
            strokeColor: config.circleFill,
            fillColor: config.circleFill,
            stroke: config.circleFill,
            strokeWidth: 1,
            scale: .96,
          });

                   
          series.links.template.set("strength", 0.2);
          
          series.data.setAll([data]);
          
          series.set("selectedDataItem", series.dataItems[0]);
          
          
          
          // Make stuff animate on load
          series.appear(1000, 100);
          return () => {
              root.dispose();
          }
    },[]);

    return (
        <div className="chart-wrap">
          <div className="padded">

          
            <div className="boxed">
              <div className="content text-center">
                <h2>Key drivers for junior and entry-level jobseekers by percentage </h2>

              </div>
            </div>
            <div className="chart" ref={chartEl}></div>
            <div className="boxed">
              <div className="content text-center">
                <a href="#" className="btn">Explore Seek's Laws of Attraction portal for more detail.</a>

              </div>
            </div>
          </div>
        </div>
    )

}

export default BubbleChart;