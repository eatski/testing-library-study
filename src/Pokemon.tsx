import { useEffect, useState } from "react"

type State = {
    status: "loading" | "error" | "notfound",
} | {
    status: "success",
    data: {
        name: string,
        photo: string
    }
}

export const Profile: React.FC<{id: string}> = ({id}) => {
    const [state,setState] = useState<State>({
        status: "loading"
    });
    useEffect(() => {
        const asyncFn = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                switch (response.status) {
                    case 404:
                        setState({
                            status: "notfound"
                        })
                        break;
                    case 200:
                        const data = await response.json();
                        setState({
                            status: "success",
                            data: {
                                name: data.name,
                                photo: data.sprites.front_default
                            }
                        })
                        break;
                    default:
                        setState({
                            status: "error"
                        })
                        break;
                }
        }
        asyncFn()
    },[id])

    switch (state.status) {
        case "success":
            return <main>
                <h1>{state.data.name}</h1>
                <img src={state.data.photo} alt={state.data.name}/>
            </main>
        case "loading":
            return <main>
                <span className="loading" aria-label="Loading" />
            </main>
        case "error":
            return <main>
                <p>Server Error</p>
            </main>
        case "notfound":
            return <main>
                <p>Not Found</p>
            </main>
       
    }
}
