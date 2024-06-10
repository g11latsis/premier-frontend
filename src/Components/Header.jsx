import React from 'react';

export default function Header() {
    const teamLogos = [
        require('../assets/teams/arsenal.png'),
        require('../assets/teams/aston-villa.png'),
        require('../assets/teams/brentford.png'),
        require('../assets/teams/brighton.png'),
        require('../assets/teams/bournemouth.png'),
        require('../assets/teams/chelsea.png'),
        require('../assets/teams/crystal-palace.png'),
        require('../assets/teams/everton.png'),
        require('../assets/teams/fulham.png'),
        require('../assets/teams/ipswitch.png'),
        require('../assets/teams/leicester.png'),
        require('../assets/teams/liverpool.png'),
        require('../assets/teams/manchester-city.png'),
        require('../assets/teams/manchester-united.png'),
        require('../assets/teams/newcastle.png'),
        require('../assets/teams/southampton.png'),
        require('../assets/teams/tottenham.png'),
        require('../assets/teams/wolves.png'),
        require('../assets/teams/west-ham.png'),
        require('../assets/teams/nottingham-forest.png'),
    ];

    return (
        <header className='bg-pl-purple p-4 ml-64 flex justify-center items-center'>
            <div className='flex flex-row gap-4'>
                {teamLogos.map((logo, index) => (
                    <img key={index} src={logo} alt='team-logo' width={50} height={50} />
                ))}
            </div>
        </header>
    )
}