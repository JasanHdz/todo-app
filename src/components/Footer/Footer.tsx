import { Wrapper } from "@/components"

function Footer() {
    return (
        <footer className="mt-10">
            <Wrapper>
                <div className="border-gray-200 border-b" />
                <div className="pt-10">
                    <div>
                        <small className="text-gray-500">
                            Copyright © {new Date().getFullYear()} Jasan Hernández, Inc. All rights reserved.
                        </small>
                    </div>
                </div>
            </Wrapper>
        </footer>
    )
}

export default Footer