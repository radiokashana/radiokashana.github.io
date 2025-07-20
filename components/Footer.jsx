import FooterMenuItem from './FooterMenuItem'

export default function Footer() {
  return (
    <footer className="white w-100 tc bg-near-black cl" data-testid="site-footer">
      <nav>
        <ul className="dib list ma0 pa0 f6">
          <FooterMenuItem href="http://www.amarcmexico.org/">AMARC México</FooterMenuItem>
          <FooterMenuItem href="https://www.facebook.com/radiokashana/">Facebook Radiokashana</FooterMenuItem>
          <FooterMenuItem href="https://www.facebook.com/lavozdelpacificoradio/">Facebook La Voz del Pacífico</FooterMenuItem>
        </ul>
      </nav>
      <h3 className="ma0">Transmitiendo en la 93.3 FM desde el punto más alto de Santa Rosalía, Baja California Sur</h3>
      <h3 className="ma0">Cel. 615 155 8484 rafael@radiokashana.org</h3>
    </footer>
  )
}