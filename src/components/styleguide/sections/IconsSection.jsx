import React from 'react';
import {
    FaShoppingCart, FaHeart, FaSearch, FaUser, FaCoffee, FaLeaf, FaCheck, FaTimes,
    FaFacebook, FaInstagram, FaArrowLeft, FaHome, FaChevronRight, FaMapMarkerAlt,
    FaShoppingBag, FaEye, FaEyeSlash, FaLock, FaSignInAlt, FaSignOutAlt, FaStar,
    FaPhone, FaEnvelope, FaClock, FaExternalLinkAlt, FaFire, FaRoute, FaUserPlus
} from 'react-icons/fa';
import { FiMinus, FiPlus, FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { HiChevronDown, HiExternalLink, HiShoppingBag } from 'react-icons/hi';
import { SiShopify, SiReact } from 'react-icons/si';
import { BiCoffeeTogo } from 'react-icons/bi';
import { Section, IconCard } from '../helpers';

export function IconsSection() {
    return (
        <Section id="icons" title="Ikony">
            <p className="text-muted mb-6">Wszystkie ikony uzywane w projekcie (react-icons)</p>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg text-accent mb-4">Fa (Font Awesome):</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        <IconCard icon={FaCoffee} name="FaCoffee" />
                        <IconCard icon={FaShoppingCart} name="FaShoppingCart" />
                        <IconCard icon={FaHeart} name="FaHeart" />
                        <IconCard icon={FaSearch} name="FaSearch" />
                        <IconCard icon={FaUser} name="FaUser" />
                        <IconCard icon={FaLeaf} name="FaLeaf" />
                        <IconCard icon={FaCheck} name="FaCheck" />
                        <IconCard icon={FaTimes} name="FaTimes" />
                        <IconCard icon={FaFacebook} name="FaFacebook" />
                        <IconCard icon={FaInstagram} name="FaInstagram" />
                        <IconCard icon={FaArrowLeft} name="FaArrowLeft" />
                        <IconCard icon={FaHome} name="FaHome" />
                        <IconCard icon={FaChevronRight} name="FaChevronRight" />
                        <IconCard icon={FaMapMarkerAlt} name="FaMapMarkerAlt" />
                        <IconCard icon={FaShoppingBag} name="FaShoppingBag" />
                        <IconCard icon={FaEye} name="FaEye" />
                        <IconCard icon={FaEyeSlash} name="FaEyeSlash" />
                        <IconCard icon={FaLock} name="FaLock" />
                        <IconCard icon={FaSignInAlt} name="FaSignInAlt" />
                        <IconCard icon={FaSignOutAlt} name="FaSignOutAlt" />
                        <IconCard icon={FaStar} name="FaStar" />
                        <IconCard icon={FaPhone} name="FaPhone" />
                        <IconCard icon={FaEnvelope} name="FaEnvelope" />
                        <IconCard icon={FaClock} name="FaClock" />
                        <IconCard icon={FaExternalLinkAlt} name="FaExternalLinkAlt" />
                        <IconCard icon={FaFire} name="FaFire" />
                        <IconCard icon={FaRoute} name="FaRoute" />
                        <IconCard icon={FaUserPlus} name="FaUserPlus" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg text-accent mb-4">Fi (Feather):</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        <IconCard icon={FiMinus} name="FiMinus" />
                        <IconCard icon={FiPlus} name="FiPlus" />
                        <IconCard icon={FiFilter} name="FiFilter" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg text-accent mb-4">Hi (Heroicons):</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        <IconCard icon={HiChevronDown} name="HiChevronDown" />
                        <IconCard icon={HiExternalLink} name="HiExternalLink" />
                        <IconCard icon={HiShoppingBag} name="HiShoppingBag" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg text-accent mb-4">Inne:</h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        <IconCard icon={IoClose} name="IoClose" />
                        <IconCard icon={SiShopify} name="SiShopify" />
                        <IconCard icon={SiReact} name="SiReact" />
                        <IconCard icon={BiCoffeeTogo} name="BiCoffeeTogo" />
                    </div>
                </div>
            </div>
        </Section>
    );
}
