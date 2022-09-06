import { useEffect, useState } from "react"

export type PokemonAPIResult = {
    status: "loading" | "error" | "notfound",
} | {
    status: "success",
    data: {
        name: string,
        photo: string
    }
}

export const usePokemonAPI = (id: string): PokemonAPIResult => {
    const [state,setState] = useState<PokemonAPIResult>({
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

    return state
}