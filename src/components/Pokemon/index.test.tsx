import {Pokemon}  from "."
import { rest } from "msw";
import {setupServer} from "msw/node"
import {render, screen} from '@testing-library/react'

const worker = setupServer()
describe("Pokemon",() => {
    beforeAll(() => worker.listen())
    afterAll(() => worker.close())
    describe("/api/v2/pokemon/{id}から正常にデータを取得できた場合",() => {
      beforeAll(() =>  worker.use(rest.get("https://pokeapi.co/api/v2/pokemon/35", async (_, res, ctx) => {
        return res(
          ctx.json({
              "id": 35,
              "name": "ピッピ",
              "sprites": {
                "front_default": "http://example.com/ピッピ.png"
              }
            })
        )
      })))
      afterAll(() => worker.resetHandlers())
      test("nameをheadingとして表示する",async () => {
        render(<Pokemon id="35"/>)
        await expect(screen.findByRole("heading",{
          name: "ピッピ"
        })).resolves.toBeInTheDocument()
      })
      test("sprites.front_defaultをimgとして表示する",async () => {
          render(<Pokemon id="35"/>)
          await expect(screen.findByRole("img",{
              name: "ピッピ"
          })).resolves.toHaveAttribute("src","http://example.com/ピッピ.png")
      })
      test("データが返ってくるまではローディングを表示する",() => {
        render(<Pokemon id="35"/>)
        expect(screen.getByLabelText("Loading")).toBeInTheDocument()
      })
    })
    describe("/api/v2/pokemon/{id}から500が返ってくる場合",() => {
      beforeAll(() => worker.use(rest.get("https://pokeapi.co/api/v2/pokemon/35", async (_, res, ctx) => {
        return res(
          ctx.status(500)
        )
      })))
      afterAll(() => worker.resetHandlers())
      test("「Server Error」を表示する",async () => {
          render(<Pokemon id="35"/>)
          await expect(screen.findByText("Server Error")).resolves.toBeInTheDocument()
      })
    })
    describe("/api/v2/pokemon/{id}から404が返ってくる場合",() => {
      beforeAll(() => worker.use(rest.get("https://pokeapi.co/api/v2/pokemon/35", async (_, res, ctx) => {
        return res(
          ctx.status(404)
        )
      })))
      afterAll(() => worker.resetHandlers())
      test("「Not Found」を表示する",async () => {
          render(<Pokemon id="35"/>)
          await expect(screen.findByText("Not Found")).resolves.toBeInTheDocument()
      })
    })
})

