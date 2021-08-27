import React, { useCallback, useState } from 'react'

import Base from '../../components/Base'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { ThirdColumnsWrapper, TwoColumnsWrapper } from '../../components/Grid'

import api from '../../services/api'

import { HomeWrapper, GroupLocale, TitleError, TitleSuccess } from './styles'

const Home: React.FC = () => {
  const [nome, setNome] = useState('')
  const [profissao, setProfissao] = useState('')
  const [identidade, setIdentidade] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataDeNascimento, setDataDeNascimento] = useState('')
  const [corDaPele, setCorDaPele] = useState('')
  const [sexo, setSexo] = useState('')
  const [localizacao, setLocalizacao] = useState('')

  const [formSucesso, setFormSucesso] = useState('')
  const [formErro, setFormErro] = useState('')
  const [localizacaoErro, setLocalizacaoErro] = useState(false)

  const getLocation = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords

      try {
        const { data } = await api.get('location', {
          params: { latitude, longitude }
        })

        if (data) {
          setLocalizacao(data.address)
        }
      } catch (error) {
        setLocalizacaoErro(true)
      }
    })
  }, [])

  const handleClear = useCallback(() => {
    setNome('')
    setProfissao('')
    setIdentidade('')
    setCpf('')
    setEmail('')
    setTelefone('')
    setDataDeNascimento('')
    setCorDaPele('')
    setSexo('')
    setLocalizacao('')
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await api.post('user', {
        nome,
        profissao,
        identidade,
        cpf,
        email,
        telefone,
        dataDeNascimento,
        corDaPele,
        sexo,
        localizacao
      })

      if (data) {
        setFormErro('')
        setFormSucesso(data.message)
        setLocalizacaoErro(false)

        handleClear()
      }
    } catch (error) {
      setFormSucesso('')
      setFormErro(error.response.data.message)
    }
  }, [
    corDaPele,
    cpf,
    dataDeNascimento,
    email,
    handleClear,
    identidade,
    localizacao,
    nome,
    profissao,
    sexo,
    telefone
  ])

  return (
    <Base>
      <HomeWrapper
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        <form>
          <h2>Dados</h2>

          {formSucesso && <TitleSuccess>{formSucesso}</TitleSuccess>}

          {!!formErro && <TitleError>{formErro}</TitleError>}

          <TwoColumnsWrapper>
            <Input
              label="Nome Completo"
              name="nome"
              required
              value={nome}
              onInputChange={setNome}
            />
            <Input
              label="Profissão"
              name="profissao"
              required
              value={profissao}
              onInputChange={setProfissao}
            />
          </TwoColumnsWrapper>
          <TwoColumnsWrapper>
            <Input
              label="Identidade"
              name="identidade"
              required
              value={identidade}
              onInputChange={setIdentidade}
            />
            <Input
              label="CPF"
              name="cpf"
              required
              value={cpf}
              onInputChange={setCpf}
            />
          </TwoColumnsWrapper>
          <TwoColumnsWrapper>
            <Input
              label="Email"
              name="email"
              required
              type="email"
              value={email}
              onInputChange={setEmail}
            />
            <Input
              label="Telefone"
              name="telefone"
              value={telefone}
              onInputChange={setTelefone}
            />
          </TwoColumnsWrapper>
          <ThirdColumnsWrapper>
            <Input
              label="Data de Nascimento"
              name="dataDeNascimento"
              type="date"
              required
              value={dataDeNascimento}
              onInputChange={setDataDeNascimento}
            />
            <Select
              label="Cor da Pele"
              name="corDaPele"
              options={[
                'Asiático',
                'Branco',
                'Indígena',
                'Marrom',
                'Preto',
                'Prefiro Não Divulgar'
              ]}
              value={corDaPele}
              onInputChange={setCorDaPele}
            />
            <Select
              label="Sexo"
              name="sexo"
              options={[
                'Agênero',
                'Homem Cisgênero',
                'Homem Transgênero',
                'Mulher Cisgênero',
                'Mulher Transgênero',
                'Não Binário',
                'Prefiro Não Divulgar'
              ]}
              value={sexo}
              onInputChange={setSexo}
            />
          </ThirdColumnsWrapper>

          <GroupLocale>
            <div>
              <Input
                label="Localização (cidade)"
                name="localizacao"
                required
                value={localizacao}
                initialValue={localizacao}
                onInputChange={setLocalizacao}
              />
              <Button variant="link" onClick={getLocation}>
                Me localize
              </Button>
            </div>
            {localizacaoErro && (
              <small>
                Endereço não encontrado, preencha o campo por favor.
              </small>
            )}
          </GroupLocale>
          <Button type="submit">Enviar</Button>
          <Button onClick={handleClear} variant="link">
            Limpar Formulário
          </Button>
        </form>
      </HomeWrapper>
    </Base>
  )
}

export default Home
