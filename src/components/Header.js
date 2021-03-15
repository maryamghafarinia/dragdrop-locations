import PropTypes from 'prop-types'

const Header = ({ title }) => {

  return (
    <header className='header'>
      <h2 data-testid='h2HeaderTag'>{title}</h2>
    </header>
  )
}

Header.defaultProps = {
  title: 'Location Management',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
