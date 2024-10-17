import "./NavPills.scss"
import React, {useState} from 'react'
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useGlobalState} from "/src/providers/GlobalStateProvider.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"
import {useLayout} from "/src/providers/LayoutProvider.jsx"

function NavPills({ sections }) {
    const {setActiveSection, isSectionActive} = useGlobalState()
    const {ongoingActivities} = useLayout()

    const [clickedPillSectionId, setClickedPillSectionId] = useState(null)

    const _isActive = (section) => {
        if(ongoingActivities.length)
            return false

        if(clickedPillSectionId)
            return section.id === clickedPillSectionId

        return isSectionActive(section.id)
    }

    const _setActive = (section) => {
        if(clickedPillSectionId)
            return

        setClickedPillSectionId(section.id)
        setTimeout(() => { setActiveSection(section.id) }, 60)
        setTimeout(() => { setClickedPillSectionId(null) }, 100)
    }

    return (
        <div className={`nav-pills`}>
            {sections.map((section,key) => (
                <NavPill key={key}
                         section={section}
                         active={_isActive(section)}
                         onClick={_setActive}/>
            ))}
        </div>
    )
}

function NavPill({section, active, onClick}) {
    const {getTranslation} = useLanguage()

    return (
        <button disabled={active}
                className={`nav-pill ${active ? `nav-pill-active` : ''}`}
                onClick={() => { onClick(section) }}>
            <FaIcon iconName={section.faIcon}/>
            <span>{getTranslation(section.content["locales"], "title")}</span>
        </button>
    )
}

export default NavPills