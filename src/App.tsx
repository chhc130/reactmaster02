import styled from "styled-components";
import {AnimatePresence, motion, useMotionValue, useTransform, useViewportScroll} from "framer-motion";
import {useEffect, useRef, useState} from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns : repeat(2, 1fr);
    width : 50vw;
    gap: 10px;
`

const Box = styled(motion.div)`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    width: 25vw;
    height: 20vw;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    display:flex;
    justify-content: center;
    align-items: center;
`

const Overlay = styled(motion.div)`
    width : 100%;
    height: 100%;    
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled(motion.button)`
    margin-top : 10px;
    color : rgba(4,85,224, 1);
    font-size: 20px;
    font-weight : 300;
    height:25px;    
`

const Circle = styled(motion.div)`
   background-color: #00a5ff;
   height: 50px;
   width: 50px;
   border-radius: 50px;
   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const overlay = {
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
    visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
    exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

/*const button = {
    initial : (onSwitch:boolean) => ({
        fontSize : onSwitch ? '20px' : '10px',
    }),
    animate : {
        fontSize: '10px',
    },
    exit : (onSwitch:boolean) => ({
        fontSize : onSwitch ? '20px' : '10px',
    }),
}*/



function App() {
    const [id, setId] = useState<null|string>(null);
    const [onSwitch, setOnSwitch] = useState(false);
    const switchHandler = () => {
        setOnSwitch((prev) => !prev);
    }
    const hoverHandler = (n:string) => {
        if (n === '1' || n === '4') {
            return {width : '30vw', height : '250px'}
        } else {
            return {height : '250px'};
        }

    }
    return (
        <Wrapper>
            <Grid>
                {["1", "2", "3", "4"].map((n) => {
                    if (n === '1' || n === '4') {
                        const hover = {height : '21vw', width:'26vw'};
                        const addOpt = {x:-10, y:-10}
                        return <Box onClick={() => setId(n)} key={n} layoutId={n} whileHover={n === '4' ? {...hover} : {...hover, ...addOpt}}/>
                    } else {
                        return <Box onClick={() => setId(n)} key={n} layoutId={n}>
                            {n === '2' ? (!onSwitch ? <Circle layoutId='circle'/> : null) : null}
                            {n === '3' ? (onSwitch ? <Circle layoutId='circle'/> : null) : null}
                        </Box>
                    }

                })}
            </Grid>
            <AnimatePresence>
                {(id==='1' || id==='4') ? (
                    <Overlay
                        variants={overlay}
                        onClick={() => setId(null)}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                    >
                        <Box layoutId={id} style={{ width: '25vw', height: 200, backgroundColor: 'rgba(255, 255, 255, 1)'}} />
                    </Overlay>

                ) : null}
            </AnimatePresence>
                <Button
                    layout
                    style={{fontSize : onSwitch ? '12px' : '10px', color: onSwitch ? 'rgba(224,133,4,1)' : 'rgba(4,85,224, 1)'}}
                    onClick={switchHandler}
                >Switch</Button>
        </Wrapper>
    );
}

export default App;