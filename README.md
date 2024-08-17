# React Camera Frame
A react component that allows you to use the keyboard to move around components.
Used in the [overflow project](https://github.com/29cmb/Github-Workflow-Builder) for the workflow builder

## How to use
You can create a CameraFrame by using the `CameraZone` component

```jsx
import { CameraZone } from "react-camframe";

function Page(){
    return (
        <div id="camZone">
            <CameraZone>
                <div pos={[0,0]}>
                    <p>hi</p>
                </div>
                <div pos={[30,30]}>
                    <p>Hi from x30 y30</p>
                </div>
            </CameraZone>
        </div>
    )
}

export default Page
```

Children of the CameraZone must have a `pos` element which determines their offset from the center of the screen (0,0)

