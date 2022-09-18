import { CaretDown, Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Select from '@radix-ui/react-select';
import axios from 'axios'

import { Input } from './Form/Input'
import { useEffect, useState, FormEvent, useCallback } from 'react'
import { api } from '../lib/axios'

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [gameSelected, setGameSelected] = useState('')



  const getGames = useCallback(async () => {
    const { data } = await api.get('games')
    setGames(data)
  }, [])

  useEffect(() => {
    getGames()
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    console.log(data)

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err);
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal >
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] overflow-y-auto py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:rounded-lg w-screen h-screen sm:w-[480px] sm:h-auto shadow-lg shadow-black/5">
        <Dialog.Title className="text-3xl font-black text-center sm:text-start">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            Qual o game?
            <Select.Root
              name="game"
              value={gameSelected}
              onValueChange={setGameSelected}
            >
              <Select.Trigger className="flex justify-between items-center bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none">
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown size={24} className="text-zinc-400" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal >
                <Select.Content>
                  <Select.Viewport>
                    <Select.Item disabled value="" className="flex justify-between items-center bg-zinc-900 py-1 px-4 text-sm text-white appearance-none">
                      <Select.ItemText>
                        Selecione o game que deseja jogar
                      </Select.ItemText>
                    </Select.Item>
                    {games.map(game => {
                      return (
                        <Select.Item
                          key={game.id}
                          className="flex justify-between items-center bg-zinc-900 py-1 px-4 text-sm text-white appearance-none hover:bg-violet-500"
                          value={game.id}
                        >
                          <Select.ItemText>
                            {game.title}
                          </Select.ItemText>

                          <Select.ItemIndicator>
                            <Check size={24} className="text-zinc-400" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      )
                    })}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input name="discord" id="discord" type="text" placeholder="Usuário#0000" />
            </div>
          </div>

          <div className="sm:flex sm:gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="flex justify-between sm:grid sm:grid-cols-4 sm:gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-md sm:text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className="text-sm sm:text-base">Costumo me conectar ao chat de voz</span>
          </label>

          <footer className="mt-4 flex flex-col-reverse items-center gap-4 justify-center sm:flex-row sm:justify-end ">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-7 sm:px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-10 sm:px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}