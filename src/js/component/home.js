import React, { useState, useRef, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [songList, setSongList] = useState([]);

	const [icono, setIcono] = useState(true);
	const [posActual, setPosActual] = useState(0);
	const [selected, setSelected] = useState([]);
	const cancion = useRef();

	const obtenerCanciones = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setSongList(data);
			cancion.current.src =
				"https://assets.breatheco.de/apis/sound/" + data[0].url;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		obtenerCanciones();
		let setInicial = [];
		setInicial[0] = "selected";
		setSelected(setInicial);
	}, []);

	const items = songList.map((element, id) => (
		<tr
			key={id}
			onClick={() => cambiarCancion(id)}
			className={selected[id]}>
			<th scope="row" style={{ color: "#4b4b4c" }}>
				{element.id}
			</th>
			<td className="text-white">{element.name} -</td>
		</tr>
	));

	const cambiarCancion = pos => {
		if (pos < 0) {
			pos = 0;
		} else if (pos >= songList.length) {
			pos = 0;
		}
		let newSelected = [];
		newSelected[pos] = "selected";
		setSelected(newSelected);
		cancion.current.src =
			"https://assets.breatheco.de/apis/sound/" + songList[pos].url;
		cancion.current.play();
		setIcono(false);
		setPosActual(pos);
	};

	const playPausa = () => {
		if (cancion.current.paused) {
			cancion.current.play();
			setIcono(false);
		} else if (!cancion.current.paused) {
			cancion.current.pause();
			setIcono(true);
		}
	};

	return (
		<div>
			<table className="table">
				<tbody>{items}</tbody>
			</table>
			<audio ref={cancion} src="" />
			<br />
			<br />
			<nav
				className="navbar navbar-light fixed-bottom d-flex justify-content-center pt-3"
				style={{ backgroundColor: "#2a2a2b" }}>
				<div className="navbar-brand mb-0 h1">
					<i
						type="button"
						className="fas fa-caret-square-left text-white mr-5"
						onClick={() => cambiarCancion(posActual - 1)}></i>
					<i
						type="button"
						className={
							icono
								? "fas fa-play text-white"
								: "fas fa-pause-circle text-white"
						}
						onClick={() => playPausa()}></i>
					<i
						type="button"
						className="fas fa-caret-square-right text-white ml-5"
						onClick={() => cambiarCancion(posActual + 1)}></i>
				</div>
			</nav>
		</div>
	);
}
