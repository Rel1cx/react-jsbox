import { useEffect, useState } from 'react'

export default function useKeyboardHeight() {
    const [height, setHeight] = useState(0)
    useEffect(() => {
        $define({
            type: "KeyboardObserver: NSObject",
            props: ["height"],
            events: {
                "init": () => {
                    self = self.$super().$init()

                    const center = $objc("NSNotificationCenter").$defaultCenter()
                    const observer = self
                    const register = (selector, name) => {
                        center.$addObserver_selector_name_object(observer, selector, name, null)
                    }

                    register("show:", "UIKeyboardWillShowNotification")
                    register("show:", "UIKeyboardDidShowNotification")
                    register("hide:", "UIKeyboardWillHideNotification")
                    return self;
                },
                "show": notification => {
                    const info = notification.$userInfo()
                    const frame = info.$objectForKey("UIKeyboardFrameEndUserInfoKey")
                    const rect = frame.$CGRectValue();
                    const height = rect.height
                    self.$setHeight(height)
                    self.$notifyHeightChange()
                },
                "hide": notification => {
                    self.$setHeight(0);
                    self.$notifyHeightChange()
                },
                "notifyHeightChange": () => {
                    const height = self.$height()
                    setHeight(height)
                }
            }
        });

        const observer = $objc("KeyboardObserver").$new();
        $objc_retain(observer);

        return () => $objc_release(observer)
    }, [])

    return height
}