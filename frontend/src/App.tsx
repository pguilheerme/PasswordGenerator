import axios from "axios"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Divider } from "primereact/divider"
import { InputNumber } from "primereact/inputnumber"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type pasSDataProps = {
  name: string,
  length: string,
  site: string,
  password: string,
}

function App() {
  const [pasSData, setPasSData] = useState<pasSDataProps[]>([])
  const [emailPasS, setEmailPasS] = useState('')
  const [sitePasS, setSitePasS] = useState('')
  const [lengthPasS, setLengthPasS] = useState<number | null | undefined>()
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const endpoint = `${import.meta.env.VITE_API_URL}/pasS/`
  const fetchData = async () => {
    const response = await axios.get(endpoint)
    const { data } = response
    console.log(data)
    setPasSData(data)
    return data
  }

  useEffect(() => {
    fetchData()
    load()
  }, [])

  const postData = async () => {
    const email = emailPasS
    const site = sitePasS
    const length = String(lengthPasS)
    const body = { email, length, site }

    const response = await axios.post(endpoint, body)
    return response.data
  }

  const hadleSendData = async () => {
    const newData = await postData()
    console.log(newData)
  }

  const doc = new jsPDF()
  const exportPdf = () => {
    autoTable(doc, {
      body: pasSData,
      columns: [
        { header: 'Email', dataKey: 'email' },
        { header: 'Site/Software', dataKey: 'site' },
        { header: 'Tamanho da senha', dataKey: 'length' },
        { header: 'Senha', dataKey: 'password' },
      ],
    })
    doc.save('Senhas.pdf')
  }

  const paginatorRight = <Button type="button" icon="pi pi-file-pdf" label="Exportar PDF" severity="danger" onClick={() => exportPdf()}/>

  return (
    <div className="flex align-items-center justify-content-center flex-column">
      <h2 className="pt-3 pb-3">Gerador de Senhas</h2>

      <form action="POST" className="flex flex-column gap-3">
        <div className="flex flex-column gap-2">
          <label htmlFor="email">Email</label>
          <InputText id="email" aria-describedby="email-help" value={emailPasS} placeholder="Digite seu email..." onChange={(e) => setEmailPasS(e.target.value)} />

        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="site">Site/Software</label>
          <InputText id="site" aria-describedby="site-help" value={sitePasS} placeholder="Site/Software" onChange={(e) => setSitePasS(e.target.value)} />

        </div>
        <div className="flex flex-column gap-2 align-items-center">
          <label htmlFor="site">Tamanho da Senha</label>
          <InputNumber value={lengthPasS} onValueChange={(e) => setLengthPasS(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
            decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" max={20} min={8} defaultValue={8} />
        </div>
        <Button label="Gerar senha" icon="pi pi-check" loading={loading} onClick={hadleSendData} severity="success" />
      </form>

      <Divider />

      <DataTable value={pasSData} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorRight={paginatorRight}>
        <Column field="email" header="Email" style={{ width: '25%' }}></Column>
        <Column field="site" header="Site" style={{ width: '25%' }}></Column>
        <Column field="length" header="Tamanho da senha" style={{ width: '25%' }}></Column>
        <Column field="password" header="Senha" style={{ width: '25%' }}></Column>
      </DataTable>

    </div>
  )
}

export default App
