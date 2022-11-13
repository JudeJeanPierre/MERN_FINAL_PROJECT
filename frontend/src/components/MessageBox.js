import Alert from 'react-bootstrap/Alert';

export default function MessageBox({children, variant}) {
  return <Alert variant={variant || 'info'}>{children}</Alert>;
}