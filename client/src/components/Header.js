import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name,isAdmin } = getUserInfo();
    return ` <div class="container">
    <a class="navbar-brand logo" href="/#/" style="font-size: 2rem">Deppo World</a
    ><button
      data-toggle="collapse"
      class="navbar-toggler"
      data-target="#navcol-1"
    >
      <span class="sr-only">Toggle navigation</span
      ><span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navcol-1">
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" href="/#/" style="font-size: 1.2rem">SHOP</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" href="/#/cart" style="font-size: 1.2rem">BASKET</a>
        </li>
        <li class="nav-item" role="presentation">
           ${
             name
               ? `<a href="#/profile">${name}</a>`
               : `<a class="nav-link" href="/#/signin"> LOGIN </a>`
           }
          </li>
          <li>
          ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>`: ""}        
          </li>
      </ul>
    </div>`;
  },
  after_render: () => {},
};
export default Header;
