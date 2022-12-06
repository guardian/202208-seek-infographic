// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap, Sine} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// import Brother from "./Brother";
import store, { ACTION_SET_SECTIONS, fetchData } from "./store";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import { BubbleIcons, CloseIcon, Logo, ScrollDown} from "./Icons";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
// import {SmoothProvider} from "react-smooth-scrolling";
import chartData from './chartData';
import BubbleChart from "./BubbleChart";



const assetsPath = "<%= path %>";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
    duration:1,
    ease: 'sine.inOut'
});

const setHtml = (html) => ({dangerouslySetInnerHTML:{__html: html}});

const Container = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`GlabsContainer ${className}`}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}
const Boxed = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`boxed ${className}`}>
            <div className="content">
                {children}

            </div>
        </div>
    )
}
// const FlexContainer = (props) => {
const FlexContainer = ({children, className}) => {
    return (
        <div className={`flex-container ${className}`} >
            {children}
        </div>
    )
}



const Loading = () => 
    <FlexContainer className="loading">
        <div style={{width: 300}}>
            <img src={`${assetsPath}/glab_logo.svg`} />
        </div>
    </FlexContainer>

const HeaderWithLogo = () => {
    const content = useSelector(s=>s.content);

    return (
        <header>
            <div className="">

                <div className="bg"
                    style={`background-image: linear-gradient(360deg, rgba(0,0,0,0.7) 10%, transparent 40%), url('${assetsPath}/header.jpg');`}>
                    
                    <div className="client">
                        <p>Paid for by 
                            <a href={content.logoLink} target="_blank">
                                <Logo />
                            </a>
                        </p>
                    </div>
                        <div>
                    <div class="title">
                            <h1 className="text-bg"><span data-dyn="headline">{content.headline}</span></h1>
                            <div className="subhead" {...setHtml(content.subhead)}></div>
                            <ScrollDown />
                        </div>
                    </div>
                </div>
            </div>
        </header>        
    )
}

const Header = () => {
    const content = useSelector(s=>s.content);

    return (
        <div className="header" >
            <div className="bg" style={{
            backgroundImage: `url(${assetsPath}/header.png), linear-gradient(0deg, #003575 0px, #003575 50%, #E7F2F0 50%)`
        }}>

            {/* <Container className="title-block">
                <div className="client-tab">
                    <h1 {...setHtml(content.title)}></h1>
                </div>
                <div>
                    <div className="main-title" {...setHtml(content.headline)}>
                        <h1 {...setHtml(content.headline)}></h1>
                    </div>

                </div>

            </Container> */}

            </div>
            <div>
                    <div class="title">
                            <div className="client-tab">
                                <a href={content.clientTabLink} {...setHtml(content.clientTab)}>Lorem ipsum</a>
                            </div>
                            <h1 className="text-bg" {...setHtml(content.headline)}></h1>
                            <div className="subhead" {...setHtml(content.subhead)}></div>
                            <ScrollDown />
                        </div>
                    </div>            
        </div>        
    )
}

const Attribution = ({content}) => {
    return (
        <div className="attribution">
            <p>Paid for by 
                <a className="mt-4 block" href={content.logoLink} target="_blank">
                    <img src={`${assetsPath}/logo.png`} className="logo" />
                </a>
            </p>
            <div className="about-content" {...setHtml(content.aboutLink)} />
        </div>
    )
}

const Footer = ({content, related, shareUrl}) => {

    return (
        <section className="footer">
            <div className="content">
                {/* <div className="break"><span /><span /><span /><span /></div> */}

                <div className="cta-wrap">
                    <div className="cta" {...setHtml(content.cta)} />
                    <div className="disc" {...setHtml(content.disc)}></div>

                </div>
                

                <div className="share">
                    <SocialBar title={content.shareTitle} url={shareUrl} twitter={content.twitterShare} />
                </div>
                <div className="related">
                    <RelatedContent cards={related} />
                </div>
            </div>
        </section>
    )
}

const StandfirstWithBorder = ({content}) => {

    return (
        <section className="standfirst">
            <div className="content" >
                <div className="lines">

                <div className="body" {...setHtml(content.standfirst)}>

                </div>
                </div>
                <ScrollDown />
            </div>
        </section>
    )
}

const Standfirst = ({content}) => {

    return (
        <div className="standfirst">
                <div className="content" {...setHtml(content.standfirst)}></div>
        </div>
    )
}

const Intro = ({content}) => {

    return (
        <div className="intro">
                <div className="content" {...setHtml(content.intro)}></div>
        </div>
    )
}


const SmoothScroll = ({children}) => {
    const app = useRef();
    const [pos, setPos] = useState(window.scrollY);
    useEffect(()=>{
        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            const dy = pos-window.scrollY;
            console.log(Math.max(-2100, dy));
            setPos(window.scrollY);
            gsap.to(app.current, {duration: 0.5, y: Math.max(-2100, dy), ease: 'sine.out'});
        });
    },[])
    return (
        <div ref={app}>
            {children}
        </div>
    )
}



const MainBody = ({children}) => {
    const ref = useRef();

    // useEffect(()=>{
    //     const resize = () => {
    //         // mainRef.current.style.height = mainRef.current.scrollHeight * 0.5 + 'px';
    //         mainRef.current.style.height = document.body.scrollHeight * 0.5 + 'px';
    //         // console.log(mainRef.current.scrollHeight, mainRef.current.scrollHeight * 0.5 + 'px');
    //         console.log('size')
    //     }
    //     window.addEventListener('resize', resize);

    //     resize();

    //     return () => window.removeEventListener('resize', resize);
    // },[]);

    useEffect(()=>{

        const t = Array.from(ref.current.querySelectorAll('section.padded-y h2'));
        // const t2 = Array.from(ref.current.querySelectorAll('div>canvas:first-child'));

        const tid = setTimeout(()=> {
            t.map(v=>{
                // console.log(v)
                gsap.from(v, {
                    y: 30,
                    alpha: .3,
                    // scrollTrigger: v
                    duration: 1,
                    scrollTrigger: {
                        trigger: v,
                        // scrub: true,
                        // start: 'top bottom',
                        end: 'top 50%',
                        toggleActions: "restart none none none"
                    }
                })});

        //     t2.map(v=>{
        //                 // console.log(v)
        //         gsap.from(v, {
        //             scale: 1.2,
        //             // alpha: .3,
        //             transformOrigin: '50%',
        //             // scrollTrigger: v
        //             duration: 1,
        //             scrollTrigger: {
        //                 trigger: v,
        //                 // scrub: true,
        //                 // start: 'top bottom',
        //                 end: 'top 50%',
        //                 toggleActions: "restart none none none"
        //             }
        // })})
        }, 200);

        return ()=>clearTimeout(tid);
    },[]);

    return (
        <div className="main" ref={ref}>
            {children}
        </div>
    )
}

const SectionHero = ({id, title}) => {
    const ref = useRef();
    useEffect(()=>{
        const img = ref.current.querySelector('.vis img');
        // console.log(img)
        setTimeout(()=>{

            gsap.from(img, {
                scrollTrigger: {
                    trigger: ref.current.querySelector('.img'),
                    scrub: true,
                    start: 'top bottom',
                    end: 'top 5%',
                },
                scale: 1.2, 
                y: 100,
                ease: 'sine.out'
            })
        },300)
    },[]);
    return (
        <div className={`section-hero ${id}`} ref={ref}>
            <div className="vis">
                <div className="img">
                    <img src={`${assetsPath}/${id}.jpg`} alt />
                    <div className="overlay"></div>

                </div>
                <header>
                    <h1>{title}</h1>
                </header>
            </div>
        </div>
    )
}

const Modal = ({children, onClose}) => {
    const ref = useRef();
    useEffect(()=>{
        gsap.to(ref.current, {duration: 1, alpha: 1, ease: 'sine.out'})
    },[]);
    return (
        <div className="modal" ref={ref}>
            <div className="inner" onClick={onClose}>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>
    )
}

const BubbleInfo = ({onClose, id, stat}) => {
    const ref = useRef();
    useEffect(()=>{
        gsap.from(ref.current, {duration: .5, alpha: 0, scale: 0.8, delay: 0.3, ease: 'sine.out'})
    },[]);

    const handeClose = () => {
        onClose();
    }
    const content = useSelector(s=>s.content);

    return (
        <div className={`bubble-info ${id} ${stat}`} ref={ref}>
            <div className="info-inner">
                <div className="icon">
                    {BubbleIcons[stat]()}
                </div>
                <div className="body">
                    <h3>{content.driverLabels[stat]}</h3>
                    <p {...setHtml(content[id][stat])}></p>
                </div>
                <button className="btn-close" onClick={handeClose}><CloseIcon /></button>
            </div>

        </div>
    )
}
const Bubble = ({id, selected, data, label, index}) => {
    const circRef = useRef();
    // console.log('create bubble')
    const [percent, setPercent] = useState(data[id][selected]);
    useEffect(()=>{

        gsap.to(circRef.current, {scale: data[id][selected]*.01, ease:'back.inOut', delay: .2 * (index - 1)});
        function onUpdate() {
            
            setPercent((this.targets()[0].percent));
        }
        const pTo = data.values[id][selected];
        gsap.to({percent:percent}, { 
            percent: pTo,
            onUpdate: onUpdate,
            ease:'sine.inOut',
            duration: 1.6,
            delay: .4 * index
        });

    },[selected]);
    return (
        <div className={`bubble ${id}`}>
            <div className="bubble-inner">
                <div className="circ-wrap">
                    <div className="circ" ref={circRef}>
                        <svg width="100%" height="100%" viewBox="0 0 252 252" fill="none" >
                            <circle  cx="126" cy="126" r="110" />
                        </svg>
                    </div>
                    <div className="val"><p>{percent.toFixed(1)}%</p></div>

                </div>
                <p className="text-center lbl"><strong>{label}</strong></p>
            </div>
        </div>
    )
}

const VisMain = ({}) => {
    const [selected, setSelected] = useState('sal');
    const handleSelect = (id) => {
        setSelected(id);
        // console.log(id);
    }
    const data = {
        "junior": {
            'sal': 61.9,
            'work': 94.82,
            'dev': 100,
            'manage': 77.5,
            'cul': 67.68,
            'loc': 100,
            'sec': 100,
            'env': 100,
            'cowork': 100,
        },
        "middle": {
            'sal': 82.99,
            'work': 100,
            'dev': 67.53,
            'manage': 80,
            'cul': 76.77,
            'loc': 97.89,
            'sec': 100,
            'env': 70.51,
            'cowork': 83.87,
        },
        "senior": {
            'sal': 100,
            'work': 86.06,
            'dev': 64.94,
            'manage': 100,
            'cul': 100,
            'loc': 63.16,
            'sec': 88.24,
            'env': 57.69,
            'cowork': 70.97,
        },
        values: {
            "junior": {
                'sal': 18.2,
                'work': 23.8,
                'dev': 15.4,
                'manage': 6.2,
                'cul': 6.7,
                'loc': 9.5,
                'sec': 6.8,
                'env': 7.8,
                'cowork': 3.1,
            },
            "middle": {
                'sal': 24.4,
                'work': 25.1,
                'dev': 10.4,
                'manage': 6.4,
                'cul': 7.6,
                'loc': 9.3,
                'sec': 6.8,
                'env': 5.5,
                'cowork': 2.6,
            },
            "senior": {
                'sal': 29.4,
                'work': 21.6,
                'dev': 10,
                'manage': 8,
                'cul': 9.9,
                'loc': 6,
                'sec': 6,
                'env': 4.5,
                'cowork': 2.2,
            },            
        },
        category: [
            { key: 'sal', lbl: 'Salary'},
            { key: 'work', lbl: 'Work-life balance'},
            { key: 'dev', lbl: 'Development'},
            { key: 'manage', lbl: 'Management'},
            { key: 'cul', lbl: 'Culture'},
            { key: 'loc', lbl: 'Location'},
            { key: 'sec', lbl: 'Job security'},
            { key: 'env', lbl: 'Work environment'},
            { key: 'cowork', lbl: 'Co-workers'},

        ]
    }

    const bgRef = useRef();

    // console.log(JSON.stringify(data))

    const content = useSelector(s=>s.content);


    useEffect(()=>{
        gsap.to(bgRef.current, {alpha:0, onComplete:()=>{
            bgRef.current.style.backgroundImage = `linear-gradient(90deg, #aceadddd,#aceadddd), url('${assetsPath}/${selected}.jpg')`;
            gsap.to(bgRef.current, {alpha: 1, delay: 1});
        }})
    },[selected])

    return (
        <div className="vis-main"
            // style={{
            //     backgroundImage: `linear-gradient(90deg, #aceadddd,#aceadddd), url('${assetsPath}/${selected}.jpg')`
            // }}
            
        >
            <div className="bg" >
                <div className="pic" ref={bgRef}></div>
            </div>
            <div className="inner">
                <div className="title" {...setHtml(content.chartTitle)}></div>
                <div className="buttons">
                    {data.category.map((v, i) =>
                        <button 
                            onClick={()=>handleSelect(v.key)}
                            key={i}
                            className={`${selected==v.key? 'active' : ''}`}
                        >
                            {v.lbl}
                        </button>
                        )}
                    
                </div>
                <div className="vis-chart">
                    <Bubble id="junior" label="Junior-level" selected={selected} data={data} index={1}/>
                    <Bubble id="middle" label="Mid-level" selected={selected} data={data} index={2}/>
                    <Bubble id="senior" label="Senior-level" selected={selected} data={data} index={3}/>
                </div>

                <div className="footnote">
                    <p><small><em>{content.footnote1} </em></small></p>
                    <div className="ref">
                        <a className="btn-ref-link" href="https://www.seek.com.au/loa?tracking=PSH-TGAIART-TheGuardianPartnerCampaign_Premium_Native-31628&utm_campaign=TheGuardianPartnerCampaign_Premium_Native&utm_source=TheGuardian&utm_medium=Link&utm_content=TheGuardianPartnerCampaign_Premium_Native_Data_VIS" target="_blank">Explore <strong>Seek's Laws of Attraction portal</strong> for more detail.</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SubChart = ({id, title}) => {

    const [modal, setModal] = useState(null);

    const handleBubbleSelect = (id, key) => {
        setModal({id, key});
    }
    
    const handleClose = () => {
        setModal(null);
    }
    return (
        <div className={`chart-wrap ${id}`}>
          <div className="padded">

          
            <div className="boxed">
              <div className="content text-center">
                <h2 style={{
                    color: `var(--${id})`
                }} {...setHtml(title)}></h2>

              </div>
            </div>
            <BubbleChart data={{...chartData[id]}} onSelect={handleBubbleSelect} id={id} />
            <div className="boxed">
                <div class="footnote">
                    <div className="ref">
                        <a className="btn-ref-link" href="https://www.seek.com.au/loa?tracking=PSH-TGAIART-TheGuardianPartnerCampaign_Premium_Native-31628&utm_campaign=TheGuardianPartnerCampaign_Premium_Native&utm_source=TheGuardian&utm_medium=Link&utm_content=TheGuardianPartnerCampaign_Premium_Native_Data_VIS" target="_blank">Explore <strong>Seek's Laws of Attraction portal</strong> for more detail.</a>
                    </div>
                </div>
            </div>
          {modal !== null && <Modal onClose={handleClose} ><BubbleInfo onClose={handleClose} stat={modal.key} id={modal.id} /></Modal>}
          </div>
        </div>
    )
}

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/1c-kdeill4S3qorqwSqRK_hdGZGPkbcOQ-qyt-to18_4.json') );
    },[]);




    const content = useSelector(s=>s.content);

    const store = useSelector(s=>s);    
    // return <Loading />;

    return (
        <SwitchTransition>
            <Transition
                key={loaded}
                timeout={1000}
                onEnter={n=>gsap.from(n,{alpha: 0})}
                onExit={n=>gsap.to(n,{alpha:0})}
                mountOnEnter
                unmountOnExit
                appear={true}
            >
                {!loaded && <Loading />}
                {loaded &&

                    
                    <MainBody>

                        
                        <Header />                        

                        <section>
                            <Container>
                                <div className="intro-body">
                                    <div>
                                        <Attribution content={content}/>

                                    </div>
                                    <div className="sfw">
                                        <Standfirst content={content}></Standfirst>
                                        {/* <Intro content={content}></Intro> */}

                                    </div>
                                </div>
                            </Container>                        

                        </section>
                        <section>
                            <VisMain />
                        </section>
                        <section 
                        className="padded-y"
                        style={{
                            paddingTop: '0'
                        }}
                        >
                            <Container>
                                <Boxed>
                                    <div {...setHtml(content.intro)}></div>
                                </Boxed>
                            </Container>
                        </section>
                        <section style={{
                            '--panelBgColor': "#4964E926"
                        }}
                        className="padded-y"
                        >
                            <SectionHero
                            id="junior"
                            title="Junior and Entry-Level Candidates"
                            >

                            </SectionHero>

 
                            <Container>
                                <Boxed>
                                    <div {...setHtml(content.juniorCopy)}></div>
                                </Boxed>

                            </Container>

                            <SubChart id="junior" 
                            title={content.juniorChartTitle}
                            />

                        </section>    



                        <section style={{
                            '--panelBgColor': "#E602780D"
                        }}
                        className="padded-y"
                        >
                            <SectionHero
                            id="middle"
                            title="Mid-Level Candidates"
                            >

                            </SectionHero>


 
                            <Container>
                                <Boxed>
                                    <div {...setHtml(content.middleCopy)}></div>
                                </Boxed>

                            </Container>

                            <SubChart id="middle" 
                            title={content.middleChartTitle}
                            />
                        </section>    

                        
                        <section style={{
                            '--panelBgColor': "#FF894626"
                        }}
                        className="padded-y"
                        >
                            <SectionHero
                            id="senior"
                            title="Senior-Level Candidates"
                            >

                            </SectionHero>


 
                            <Container>
                                <Boxed>
                                    <div {...setHtml(content.seniorCopy)}></div>
                                </Boxed>

                            </Container>

                            <SubChart id="senior" 
                            title={content.seniorChartTitle}
                            />
                        </section>    
                         
                        <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
                        

                    </MainBody>
                    
                }
            </Transition>            
        </SwitchTransition>
    )
}


const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>

    )
}

render( <App/>, document.getElementById('Glabs'));

