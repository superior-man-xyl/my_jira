import styled from "@emotion/styled";
//做一些可复用的样式组件
export const Row = styled.div<{
    gap?:number|boolean,
    between?:boolean,
    marginBottom?:number,

}>`
display: flex;
align-items: center;
justify-content:${props => props.between? 'space-between':undefined};
margin-bottom: ${props => props.marginBottom + 'rem'};
> * {
margin-top: 0 !important;
margin-bottom: 0 !important;
margin-right: ${props=> typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`