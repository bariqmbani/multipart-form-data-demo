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
		pihak_terkait: {
			0: {
				lembaga: '',
				peran: '',
				penjelasan_pihak_terkait: '',
			},
		},
		media: [],
		penanggung_jawab: {
			nama: '',
			jabatan: '',
			nip: '',
		},
	})

	const onChange = (event, property, array = false, index) => {
		if (property)
			setData({
				...data,
				[property]: array
					? {
							...data[property],
							[index]: {
								...data[property][index],
								[event.target.name]: event.target.value,
							},
					  }
					: {
							...data[property],
							[event.target.name]: event.target.value,
					  },
			})
		else setData({ ...data, [event.target.name]: event.target.value })
	}

	const onChangeFiles = (event) => {
		setData({ ...data, media: event.target.files })
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
				'x-auth-token':
					'aweuaweu eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imluc3RhbnNpIjp7Il9pZCI6IjVlYWQwNjk5MWQzOWM5NjAyN2NhNzE5NCIsIm5hbWEiOiJLZW1lbnRlcmlhbiBQZW5kYXlhZ3VuYWFuIEFwYXJhdHVyIE5lZ2FyYSBkYW4gUmVmb3JtYXNpIEJpcm9rcmFzaSIsIm5hbWFfcGVuZGVrIjoiS2VtZW5wYW4ifSwic3VzcGVuc2kiOmZhbHNlLCJsb2dpbl9hd2FsIjp0cnVlLCJfaWQiOiI1ZWFkMjEzMDk5MTMyOTMwZDg3OWYzYzUiLCJuYW1hIjoiU3VwZXIgS2VtZW5wYW4gU2F0dSIsInJvbGUiOiJzdXBlcl9hZG1pbiIsInVzZXJuYW1lIjoic3VwZXJrZW1lbnBhbjEiLCJ0YW5nZ2FsX2RpYnVhdCI6IjIwMjAtMDUtMDJUMDc6Mjg6NDguMjYzWiIsInRhbmdnYWxfZGlwZXJiYXJ1aSI6IjIwMjAtMDUtMDJUMDc6Mjg6NDguMjYzWiIsIl9fdiI6MH0sImlhdCI6MTU4ODQwNTc1NiwiZXhwIjoxNTkwOTk3NzU2fQ.ttenpcgoftj7h54fPFSHgY-u43Tv_XmBL2EC6K5vctM',
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
									onChange={(event) =>
										onChange(event, 'pihak_terkait', true, 0)
									}
									type="text"
									name="lembaga"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="peran">peran</label>
								<input
									onChange={(event) =>
										onChange(event, 'pihak_terkait', true, 0)
									}
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
									onChange={(event) =>
										onChange(event, 'pihak_terkait', true, 0)
									}
									name="penjelasan_pihak_terkait"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="lembaga">lembaga</label>
								<input
									onChange={(event) =>
										onChange(event, 'pihak_terkait', true, 1)
									}
									type="text"
									name="lembaga"
									className="form-control"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="peran">peran</label>
								<input
									onChange={(event) =>
										onChange(event, 'pihak_terkait', true, 1)
									}
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
									onChange={(event) =>
										onChange(event, 'pihak_terkait', true, 1)
									}
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
