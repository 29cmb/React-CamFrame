# Usage
The way that you use it is explained in the README.md, this will go into far more details

There is 1 component and 2 methods included in this package.

`CameraZone` - The component that moves with key-presses

`useCamPos` - Get the current cam position

`useOffset` - Get the offset of the camera (to make pos 0,0 at the center)

## CameraZone usage
The CameraZone will make it so `0,0` is the center, and clicking `WASD` or the arrow keys will move the positions of the elements relative to their `pos` values
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
> [!NOTE]\
> The CameraZone is a 100% width 100% height div that is moved to the center of the screen, and that div **DOES NOT MOVE**, only the child elements move.


# useCamPos usage
useCamPos will return the pixel values of coordinates, in my project, I divide them and floor them to make them smaller when I display the camPos visually (as text)

```jsx
import React from "react";
import {useCamPos} from "react-camframe";

function Page(){
    const camPosition = useCamPos()
    return (
        <div>
            <p>The current cam position is {camPosition[0]}, {camPosition[1]}</p>
        </div>
    )
}

export default Page
```

# useOffset
useOffset will return the offset of your mouse to the camera, useful for placing or inserting items into the CameraZone

```jsx
import React from "react";
import {useOffset} from "react-camframe";

function Page(){
    const camOffset = useOffset()
    return (
        <div>
            <p>The current cam offset is {camOffset[0]}, {camOffset[1]}</p>
        </div>
    )
}

export default Page
```
