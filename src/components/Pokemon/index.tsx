import { usePokemonAPI } from "./usePokemonAPI"

export const Pokemon: React.FC<{id: string}> = ({id}) => {
    const result = usePokemonAPI(id);
    switch (result.status) {
        case "success":
            return <main>
                <h1>{result.data.name}</h1>
                <img src={result.data.photo} alt={result.data.name}/>
            </main>
        case "loading":
            return <main>
                <span role={"img"} className="loading" aria-label="Loading" />
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
