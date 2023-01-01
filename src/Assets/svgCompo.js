import * as React from "react"

const SvgComponent = (props) => (
    <svg
        style={{
            transform: "rotate(180deg)",
            transition: ".3s",
        }}
        viewBox="0 0 1440 300"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient id="a" x1={0} x2={0} y1={1} y2={0}>
                <stop stopColor="rgba(243, 106, 62, 1)" offset="0%" />
                <stop stopColor="rgba(255, 179, 11, 1)" offset="100%" />
            </linearGradient>
        </defs>
        <path
            style={{
                transform: "translate(0,0)",
                opacity: 1,
            }}
            fill="url(#a)"
            d="m0 60 48 20c48 20 144 60 240 60s192-40 288-70 192-50 288-25 192 95 288 110 192-25 288-40 192-5 288 20 192 65 288 60 192-55 288-90 192-55 288-60 192 5 288 20 192 35 288 40 192-5 288-20 192-35 288-45 192-10 288 0 192 30 288 25 192-35 288-35 192 30 288 40 192 0 288 0 192 10 288 40 192 80 288 80 192-50 288-90 192-70 288-50 192 90 288 125 192 35 240 35h48v90H0Z"
        />
    </svg>
)

export default SvgComponent
