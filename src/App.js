import React from 'react'
import axios from 'axios'
import objectToFormData from './objectToFormDataUtil'

const App = () => {
	const [data, setData] = React.useState({
		kegiatan: {
			nama_program: '',
			penjelasan_kegiatan: '',
		},
		output: {
			indikator_capaian: '',
			sasaran: '',
			target: '',
		},
		kondisi_awal: '',
		anggaran: {
			sumber_dana: '',
			besar_anggaran: '',
		},
		proses: '',
		pihak_terkait: [
			{
				lembaga: '',
				peran: '',
				penjelasan: '',
			},
		],
		lampiran: {
			media: [],
		},
		penanggung_jawab: {
			nama: '',
			jabatan: '',
			nip: '',
		},
	})

	const onChange = (event, property) => {
		if (property)
			setData({
				...data,
				[property]: {
					...data[property],
					[event.target.name]: event.target.value,
				},
			})
		else setData({ ...data, [event.target.name]: event.target.value })
	}

	const onChangeFiles = (event) => {
		if (event.target.files)
			setData({
				...data,
				lampiran: {
					...data['lampiran'],
					media: event.target.files,
				},
			})
		else
			setData({
				...data,
				lampiran: {
					...data['lampiran'],
					media: {},
				},
			})
	}

	const onSubmit = async (event) => {
		event.preventDefault()
		console.log(data)
		const formData = objectToFormData(data)
		for (let pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1])
		}

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'x-auth-token': '<TOKEN>',
			},
		}

		const res = await axios.post(
			'http://localhost:5000/api/v1/document?type=gnrm',
			formData,
			config,
		)

		console.log(res.data)
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-7">
					<form onSubmit={onSubmit}>
						<div className="card p-4 m-2 mb-4">
							<h6>KEGIATAN</h6>
							<div className="form-group">
								<label htmlFor="nama_program">nama_program</label>
								<input
									onChange={(event) => onChange(event, 'kegiatan')}
									type="text"
									name="nama_program"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="penjelasan_kegiatan">penjelasan_kegiatan</label>
								<textarea
									onChange={(event) => onChange(event, 'kegiatan')}
									name="penjelasan_kegiatan"
									className="form-control"
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>OUTPUT</h6>
							<div className="form-group">
								<label htmlFor="indikator_capaian">indikator_capaian</label>
								<textarea
									onChange={(event) => onChange(event, 'output')}
									name="indikator_capaian"
									className="form-control"
								/>
							</div>

							<div className="form-group">
								<label htmlFor="sasaran">sasaran</label>
								<textarea
									name="sasaran"
									className="form-control"
									onChange={(event) => onChange(event, 'output')}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="target">target</label>
								<textarea
									name="target"
									className="form-control"
									onChange={(event) => onChange(event, 'output')}
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>KONDISI AWAL</h6>
							<div className="form-group">
								<label htmlFor="kondisi_awal">kondisi_awal</label>
								<textarea
									name="kondisi_awal"
									className="form-control"
									onChange={(event) => onChange(event)}
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>ANGGARAN</h6>
							<div className="form-group">
								<label htmlFor="sumber_dana">sumber_dana</label>
								<input
									onChange={(event) => onChange(event, 'anggaran')}
									type="text"
									name="sumber_dana"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="besar_anggaran">besar_anggaran</label>
								<input
									onChange={(event) => onChange(event, 'anggaran')}
									type="text"
									name="besar_anggaran"
									className="form-control"
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>PROSES</h6>
							<div className="form-group">
								<label htmlFor="proses">proses</label>
								<textarea
									name="proses"
									className="form-control"
									onChange={(event) => onChange(event)}
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>PIHAK TERKAIT</h6>
							<div className="form-group">
								<label htmlFor="lembaga">lembaga</label>
								<input
									onChange={(event) => onChange(event, 'pihak_terkait')}
									type="text"
									name="lembaga"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="peran">peran</label>
								<input
									onChange={(event) => onChange(event, 'pihak_terkait')}
									type="text"
									name="peran"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="penjelasan_pihak_terkait">
									penjelasan_pihak_terkait
								</label>
								<textarea
									onChange={(event) => onChange(event, 'pihak_terkait')}
									name="penjelasan_pihak_terkait"
									className="form-control"
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>LAMPIRAN</h6>
							<div className="form-group">
								<label htmlFor="media">media</label>
								<input
									onChange={onChangeFiles}
									type="file"
									accept="image/*"
									name="media"
									className="form-control"
									multiple
								/>
							</div>
						</div>

						<div className="card p-4 m-2 mb-4">
							<h6>PENANGGUNG JAWAB</h6>
							<div className="form-group">
								<label htmlFor="nama">nama</label>
								<input
									onChange={(event) => onChange(event, 'penanggung_jawab')}
									type="text"
									name="nama"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="jabatan">jabatan</label>
								<input
									onChange={(event) => onChange(event, 'penanggung_jawab')}
									type="text"
									name="jabatan"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="nip">nip</label>
								<input
									onChange={(event) => onChange(event, 'penanggung_jawab')}
									type="text"
									name="nip"
									className="form-control"
								/>
							</div>
						</div>

						<div className="text-right mb-2">
							<button className="btn-lg btn-danger">Simpan Perubahan</button>
						</div>
					</form>
				</div>
				<div className="col-lg-5">
					<div
						className="position-fixed"
						style={{ overflow: 'scroll', height: '100%', width: '100%' }}
					>
						<h4>hasil FormData di console</h4>
						<pre className="mt-4">
							<code>{JSON.stringify(data, null, 2)}</code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
