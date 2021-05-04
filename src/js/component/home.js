import React, { useState, useRef } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [songList, setSongList] = useState([
		{
			id: 1,
			category: "game",
			name: "Mario Castle",
			url: "files/mario/songs/castle.mp3"
		},
		{
			id: 2,
			category: "game",
			name: "Mario Star",
			url: "files/mario/songs/hurry-starman.mp3"
		},
		{
			id: 3,
			category: "game",
			name: "Mario Overworld",
			url: "files/mario/songs/overworld.mp3"
		},
		{
			id: 4,
			category: "game",
			name: "Mario Stage 1",
			url: "files/mario/songs/stage1.mp3"
		},
		{
			id: 5,
			category: "game",
			name: "Mario Stage 2",
			url: "files/mario/songs/stage2.mp3"
		},
		{
			id: 6,
			category: "game",
			name: "Mario Star",
			url: "files/mario/songs/starman.mp3"
		},
		{
			id: 7,
			category: "game",
			name: "Mario Underworld",
			url: "files/mario/songs/underworld.mp3"
		},
		{
			id: 8,
			category: "game",
			name: "Mario Underwater",
			url: "files/mario/songs/underwater.mp3"
		},
		{
			id: 9,
			category: "game",
			name: "Zelda Castle",
			url: "files/videogame/songs/zelda_castle.mp3"
		},
		{
			id: 10,
			category: "game",
			name: "Zelda Outworld",
			url: "files/videogame/songs/zelda_outworld.mp3"
		},
		{
			id: 11,
			category: "game",
			name: "Zelda Titles",
			url: "files/videogame/songs/zelda_title.mp3"
		},
		{
			id: 12,
			category: "game",
			name: "Sonic Brain Zone",
			url: "files/videogame/songs/sonic_brain-zone.mp3"
		},
		{
			id: 13,
			category: "game",
			name: "Zelda Link To Past",
			url: "files/videogame/songs/zelda_link-to-past.mp3"
		},
		{
			id: 14,
			category: "game",
			name: "Dong KinKong Main",
			url: "files/other/songs/dkng-main.mp3"
		},
		{
			id: 15,
			category: "game",
			name: "Dong KinKong Other",
			url: "files/other/songs/dkng-other.mp3"
		},
		{
			id: 16,
			category: "game",
			name: "mega-man",
			url: "files/other/songs/mega-man.mp3"
		},
		{
			id: 17,
			game: "cartoon",
			name: "Flintstones",
			url: "files/cartoons/songs/flintstones.mp3"
		},
		{
			id: 18,
			game: "cartoon",
			name: "power-rangers",
			url: "files/cartoons/songs/power-rangers.mp3"
		},
		{
			id: 19,
			game: "cartoon",
			name: "simpsons",
			url: "files/cartoons/songs/simpsons.mp3"
		},
		{
			id: 20,
			game: "cartoon",
			name: "south-park",
			url: "files/cartoons/songs/south-park.mp3"
		},
		{
			id: 21,
			game: "cartoon",
			name: "thundercats",
			url: "files/cartoons/songs/thundercats.mp3"
		},
		{
			id: 22,
			game: "cartoon",
			name: "x-men",
			url: "files/cartoons/songs/x-men.mp3"
		}
	]);

	const [icono, setIcono] = useState(true);
	const [posActual, setPosActual] = useState(0);
	const [backActual, setBackActual] = useState("");
	const cancion = useRef();

	const items = songList.map((element, id) => (
		<tr key={id} onClick={() => cambiarCancion(id)}>
			<th className="text-muted" scope="row">
				{element.id}
			</th>
			<td className="text-white">{element.name}-</td>
		</tr>
	));

	const cambiarCancion = pos => {
		if (pos < 0) {
			pos = 0;
		} else if (pos >= songList.length) {
			pos = 0;
		}

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
			<nav className="navbar navbar-light bg-dark fixed-bottom d-flex justify-content-center pt-3">
				<div className="navbar-brand mb-0 h1">
					<i
						className="fas fa-caret-square-left text-white mr-5"
						onClick={() => cambiarCancion(posActual - 1)}></i>
					<i
						className={
							icono
								? "fas fa-play text-white"
								: "fas fa-pause-circle text-white"
						}
						onClick={() => playPausa()}></i>
					<i
						className="fas fa-caret-square-right text-white ml-5"
						onClick={() => cambiarCancion(posActual + 1)}></i>
				</div>
			</nav>
		</div>
	);
}
