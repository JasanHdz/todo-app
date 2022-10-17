import { Wrapper } from "@/components"

function Footer() {
    return (
        <footer className="mt-10">
            <Wrapper>
                <div className="border-gray-200 border-b" />
                <div className="pt-10">
                    <div className="flex justify-between">
                        <small className="text-gray-500 text-xs">
                            Copyright © {new Date().getFullYear()} Jasan Hernández, Inc. All rights reserved.
                        </small>
                        <ul className="text-xs flex gap-4">
                            <li className="cursor-pointer select-none">Avisos de privacidad</li>
                            <li className="cursor-pointer select-none">|</li>
                            <li className="cursor-pointer select-none">Terminos y condiciones</li>
                        </ul>
                    </div>
                </div>
            </Wrapper>
        </footer>
    )
}

export default Footer