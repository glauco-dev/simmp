"use client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'


export default function Footer() {
    return (
        <footer>
            <div className="row max-w-4xl mx-auto">
                <div className="col l10">
                    <p>Copyright 2023 © - Todos os direitos reservados<br />
                        SIMMP - Sindicato do Magistério Municipal Público de Vitória da Conquista<br />
                        Vitória da Conquista - BA</p>
                </div>
                <div className="col l2">
                    <img className="responsive-img" src="logo completa branca layout alt.png" alt="SIMMP" title="SIMMP" />
                </div>
            </div>
            <MapContainer center={[-14.85238, -40.83086]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-14.85238, -40.83086]}>
                    <Popup>
                        SIMMP
                    </Popup>
                </Marker>
            </MapContainer>
        </footer>
    )
}