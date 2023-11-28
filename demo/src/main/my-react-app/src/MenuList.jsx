import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import MenuItem from '../components/MenuItem';
import BottomNav from '../components/base/BottomNav';

const MenuBlock = styled.div`
    .logo {
        img {
            margin: 0 auto;
            display: flex;
            width: 200px;
            height: 121px;
            left: 574px;
            top: 85px;
        }
    }

    .text {
        h1 {
            width:100%;
            text-align:center;
            margin: 0 auto;
            display: block;
            margin:5rem;
            font-family: 'IBM Plex Mono';
            font-style: normal;
            font-weight: 400;
            font-size: 60.84px;
            line-height: 50px;

        }
    }


`;
const MenuList = () => {
    const imogi = "/img/imogimenu.png";
    const [menu, setMenu] = useState([]);

    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([]);

    //API 요청이 대기 중인지 판별
    //요청이 대기 중일때는 true, 요청이 끝나면 false
    const [loading, setLoading] = useState(false);

    const getMenu = async() => {
     setLoading(true);
     try {
        const response = await axios.post('http://localhost:8080/compare-food', {
          foodName: foodName,
        });

        // 서버 응답에서 파일 경로를 콘솔에 출력
        console.log("Server Response:", response.data);

        setFoodList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
     };

    useEffect(()=>{
     getMenu();
    },[]);

    //대기 중일때
    if(loading) {
        return <div>대기 중...</div>;
    }

    //menu값이 유효할 때
    return (
        <MenuBlock>
            <div className="logo">
                <img src={imogi} alt=""/>
            </div>

            <div className="text">
                <h1>This is the menu of the Resutraunt</h1>
            </div>
            <div>
                 <>
                 {/*{menu.map((food) => (
                    <Link key={food.id} to={`/login/main/picture/menu/detail/${food.id}`}>
                         <MenuItem key={food.id} food={food} />
                    </Link>
                ))}*/}
                {foodList.map((food) => (
                    <div key={food.id}>
                    {food.foodname}
                    </div>
                ))}
                </>
            </div>
            <BottomNav />
        </MenuBlock>
    );
};

export default MenuList;