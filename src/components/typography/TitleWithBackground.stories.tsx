import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TitleWithBackground } from './TitleWithBackground';

export default {
  jumbotron: 'TitleWithBackground',
  component: TitleWithBackground,
} as ComponentMeta<typeof TitleWithBackground>;

const Template: ComponentStory<typeof TitleWithBackground> = args => <TitleWithBackground {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  story => (
    <div className={'flex flex-col justify-center items-center w-full h-screen'}>
      {story()}
      <a
        target={'_blank'}
        rel={'noreferrer'}
        href="https://hypercolor.dev/"
        className={'block mt-6 font-medium text-blue-600 dark:text-blue-500 hover:underline'}
      >
        More Gradients
      </a>
    </div>
  ),
];
Default.args = {
  title: 'James Macmillan',
};

export const Hyper = Template.bind({});
Hyper.decorators = Default.decorators;
Hyper.args = {
  ...Default.args,
  className: 'hyper to-tr',
};

export const Oceanic = Template.bind({});
Oceanic.decorators = Default.decorators;
Oceanic.args = {
  ...Default.args,
  className: 'oceanic to-tr',
};

export const CottonCandy = Template.bind({});
CottonCandy.decorators = Default.decorators;
CottonCandy.args = {
  ...Default.args,
  className: 'cotton-candy to-tr',
};

export const Gotham = Template.bind({});
Gotham.decorators = Default.decorators;
Gotham.args = {
  ...Default.args,
  className: 'gotham to-tr',
};

export const Sunset = Template.bind({});
Sunset.decorators = Default.decorators;
Sunset.args = {
  ...Default.args,
  className: 'sunset to-tr',
};

export const Mojave = Template.bind({});
Mojave.decorators = Default.decorators;
Mojave.args = {
  ...Default.args,
  className: 'mojave to-tr',
};

export const Beachside = Template.bind({});
Beachside.decorators = Default.decorators;
Beachside.args = {
  ...Default.args,
  className: 'beachside to-tr',
};

export const Gunmetal = Template.bind({});
Gunmetal.decorators = Default.decorators;
Gunmetal.args = {
  ...Default.args,
  className: 'gunmetal to-tr',
};

export const Peachy = Template.bind({});
Peachy.decorators = Default.decorators;
Peachy.args = {
  ...Default.args,
  className: 'peachy to-tr',
};

export const Seafoam = Template.bind({});
Seafoam.decorators = Default.decorators;
Seafoam.args = {
  ...Default.args,
  className: 'seafoam to-tr',
};

export const Pumpkin = Template.bind({});
Pumpkin.decorators = Default.decorators;
Pumpkin.args = {
  ...Default.args,
  className: 'pumpkin to-tr',
};

export const Pandora = Template.bind({});
Pandora.decorators = Default.decorators;
Pandora.args = {
  ...Default.args,
  className: 'pandora to-tr',
};

export const Valentine = Template.bind({});
Valentine.decorators = Default.decorators;
Valentine.args = {
  ...Default.args,
  className: 'valentine to-tr',
};

export const Hawaii = Template.bind({});
Hawaii.decorators = Default.decorators;
Hawaii.args = {
  ...Default.args,
  className: 'hawaii to-tr',
};

export const Lavender = Template.bind({});
Lavender.decorators = Default.decorators;
Lavender.args = {
  ...Default.args,
  className: 'lavender to-tr',
};

export const Wintergreen = Template.bind({});
Wintergreen.decorators = Default.decorators;
Wintergreen.args = {
  ...Default.args,
  className: 'wintergreen to-tr',
};

export const Huckleberry = Template.bind({});
Huckleberry.decorators = Default.decorators;
Huckleberry.args = {
  ...Default.args,
  className: 'huckleberry to-tr',
};

export const BlueSteel = Template.bind({});
BlueSteel.decorators = Default.decorators;
BlueSteel.args = {
  ...Default.args,
  className: 'blue-steel to-tr',
};

export const Arendelle = Template.bind({});
Arendelle.decorators = Default.decorators;
Arendelle.args = {
  ...Default.args,
  className: 'arendelle to-tr',
};

export const Spearmint = Template.bind({});
Spearmint.decorators = Default.decorators;
Spearmint.args = {
  ...Default.args,
  className: 'spearmint to-tr',
};

export const Minnesota = Template.bind({});
Minnesota.decorators = Default.decorators;
Minnesota.args = {
  ...Default.args,
  className: 'minnesota to-tr',
};

export const Bombpop = Template.bind({});
Bombpop.decorators = Default.decorators;
Bombpop.args = {
  ...Default.args,
  className: 'bombpop to-tr',
};

export const Acadia = Template.bind({});
Acadia.decorators = Default.decorators;
Acadia.args = {
  ...Default.args,
  className: 'acadia to-tr',
};

export const Sonora = Template.bind({});
Sonora.decorators = Default.decorators;
Sonora.args = {
  ...Default.args,
  className: 'sonora to-tr',
};

export const Paradise = Template.bind({});
Paradise.decorators = Default.decorators;
Paradise.args = {
  ...Default.args,
  className: 'paradise to-tr',
};

export const SierraMist = Template.bind({});
SierraMist.decorators = Default.decorators;
SierraMist.args = {
  ...Default.args,
  className: 'sierra-mist to-tr',
};

export const Creamsicle = Template.bind({});
Creamsicle.decorators = Default.decorators;
Creamsicle.args = {
  ...Default.args,
  className: 'creamsicle to-tr',
};

export const Midnight = Template.bind({});
Midnight.decorators = Default.decorators;
Midnight.args = {
  ...Default.args,
  className: 'midnight to-tr',
};

export const Borealis = Template.bind({});
Borealis.decorators = Default.decorators;
Borealis.args = {
  ...Default.args,
  className: 'borealis to-tr',
};

export const Strawberry = Template.bind({});
Strawberry.decorators = Default.decorators;
Strawberry.args = {
  ...Default.args,
  className: 'strawberry to-tr',
};

export const Flamingo = Template.bind({});
Flamingo.decorators = Default.decorators;
Flamingo.args = {
  ...Default.args,
  className: 'flamingo to-tr',
};

export const BurningSunrise = Template.bind({});
BurningSunrise.decorators = Default.decorators;
BurningSunrise.args = {
  ...Default.args,
  className: 'burning-sunrise to-tr',
};

export const Apple = Template.bind({});
Apple.decorators = Default.decorators;
Apple.args = {
  ...Default.args,
  className: 'apple to-tr',
};

export const Watermelon = Template.bind({});
Watermelon.decorators = Default.decorators;
Watermelon.args = {
  ...Default.args,
  className: 'watermelon to-tr',
};

export const Flare = Template.bind({});
Flare.decorators = Default.decorators;
Flare.args = {
  ...Default.args,
  className: 'flare to-tr',
};

export const Rasta = Template.bind({});
Rasta.decorators = Default.decorators;
Rasta.args = {
  ...Default.args,
  className: 'rasta to-tr',
};

export const Lust = Template.bind({});
Lust.decorators = Default.decorators;
Lust.args = {
  ...Default.args,
  className: 'lust to-tr',
};

export const Sublime = Template.bind({});
Sublime.decorators = Default.decorators;
Sublime.args = {
  ...Default.args,
  className: 'sublime to-tr',
};

export const Witch = Template.bind({});
Witch.decorators = Default.decorators;
Witch.args = {
  ...Default.args,
  className: 'witch to-tr',
};

export const Powerpuff = Template.bind({});
Powerpuff.decorators = Default.decorators;
Powerpuff.args = {
  ...Default.args,
  className: 'powerpuff to-tr',
};

export const SolidBlue = Template.bind({});
SolidBlue.decorators = Default.decorators;
SolidBlue.args = {
  ...Default.args,
  className: 'solid-blue to-tr',
};

export const Ice = Template.bind({});
Ice.decorators = Default.decorators;
Ice.args = {
  ...Default.args,
  className: 'ice to-tr',
};

export const Sky = Template.bind({});
Sky.decorators = Default.decorators;
Sky.args = {
  ...Default.args,
  className: 'sky to-tr',
};

export const Horizon = Template.bind({});
Horizon.decorators = Default.decorators;
Horizon.args = {
  ...Default.args,
  className: 'horizon to-tr',
};

export const Morning = Template.bind({});
Morning.decorators = Default.decorators;
Morning.args = {
  ...Default.args,
  className: 'morning to-tr',
};

export const Space = Template.bind({});
Space.decorators = Default.decorators;
Space.args = {
  ...Default.args,
  className: 'space to-tr',
};

export const Earth = Template.bind({});
Earth.decorators = Default.decorators;
Earth.args = {
  ...Default.args,
  className: 'earth to-tr',
};

export const Picture = Template.bind({});
Picture.decorators = Default.decorators;
Picture.args = {
  ...Default.args,
  className: 'picture to-tr',
};

export const Messenger = Template.bind({});
Messenger.decorators = Default.decorators;
Messenger.args = {
  ...Default.args,
  className: 'messenger to-tr',
};

export const Sea = Template.bind({});
Sea.decorators = Default.decorators;
Sea.args = {
  ...Default.args,
  className: 'sea to-tr',
};

export const Payment = Template.bind({});
Payment.decorators = Default.decorators;
Payment.args = {
  ...Default.args,
  className: 'payment to-tr',
};

export const Video = Template.bind({});
Video.decorators = Default.decorators;
Video.args = {
  ...Default.args,
  className: 'video to-tr',
};

export const Passion = Template.bind({});
Passion.decorators = Default.decorators;
Passion.args = {
  ...Default.args,
  className: 'passion to-tr',
};

export const Flower = Template.bind({});
Flower.decorators = Default.decorators;
Flower.args = {
  ...Default.args,
  className: 'flower to-tr',
};

export const CoolSunset = Template.bind({});
CoolSunset.decorators = Default.decorators;
CoolSunset.args = {
  ...Default.args,
  className: 'cool-sunset to-tr',
};

export const PinkNeon = Template.bind({});
PinkNeon.decorators = Default.decorators;
PinkNeon.args = {
  ...Default.args,
  className: 'pink-neon to-tr',
};

export const BlueSand = Template.bind({});
BlueSand.decorators = Default.decorators;
BlueSand.args = {
  ...Default.args,
  className: 'blue-sand to-tr',
};

export const Emerald = Template.bind({});
Emerald.decorators = Default.decorators;
Emerald.args = {
  ...Default.args,
  className: 'emerald to-tr',
};

export const RelaxedRose = Template.bind({});
RelaxedRose.decorators = Default.decorators;
RelaxedRose.args = {
  ...Default.args,
  className: 'relaxed-rose to-tr',
};

export const PurpleHaze = Template.bind({});
PurpleHaze.decorators = Default.decorators;
PurpleHaze.args = {
  ...Default.args,
  className: 'purple-haze to-tr',
};

export const Silver = Template.bind({});
Silver.decorators = Default.decorators;
Silver.args = {
  ...Default.args,
  className: 'silver to-tr',
};

export const OrangeCoral = Template.bind({});
OrangeCoral.decorators = Default.decorators;
OrangeCoral.args = {
  ...Default.args,
  className: 'orange-coral to-tr',
};

export const BlueCoral = Template.bind({});
BlueCoral.decorators = Default.decorators;
BlueCoral.args = {
  ...Default.args,
  className: 'blue-coral to-tr',
};

export const BeamOfLight = Template.bind({});
BeamOfLight.decorators = Default.decorators;
BeamOfLight.args = {
  ...Default.args,
  className: 'beam-of-light to-tr',
};

export const SafariSunset = Template.bind({});
SafariSunset.decorators = Default.decorators;
SafariSunset.args = {
  ...Default.args,
  className: 'safari-sunset to-tr',
};

export const HighTide = Template.bind({});
HighTide.decorators = Default.decorators;
HighTide.args = {
  ...Default.args,
  className: 'high-tide to-tr',
};

export const Hunniepop = Template.bind({});
Hunniepop.decorators = Default.decorators;
Hunniepop.args = {
  ...Default.args,
  className: 'hunniepop to-tr',
};

export const SoftMetal = Template.bind({});
SoftMetal.decorators = Default.decorators;
SoftMetal.args = {
  ...Default.args,
  className: 'soft-metal to-tr',
};

export const CoralSun = Template.bind({});
CoralSun.decorators = Default.decorators;
CoralSun.args = {
  ...Default.args,
  className: 'coral-sun to-tr',
};

export const PowerPink = Template.bind({});
PowerPink.decorators = Default.decorators;
PowerPink.args = {
  ...Default.args,
  className: 'power-pink to-tr',
};

export const PowderBlue = Template.bind({});
PowderBlue.decorators = Default.decorators;
PowderBlue.args = {
  ...Default.args,
  className: 'powder-blue to-tr',
};

export const MoodySunset = Template.bind({});
MoodySunset.decorators = Default.decorators;
MoodySunset.args = {
  ...Default.args,
  className: 'moody-sunset to-tr',
};

export const BurntSand = Template.bind({});
BurntSand.decorators = Default.decorators;
BurntSand.args = {
  ...Default.args,
  className: 'burnt-sand to-tr',
};

export const BlueWhiteSplit = Template.bind({});
BlueWhiteSplit.decorators = Default.decorators;
BlueWhiteSplit.args = {
  ...Default.args,
  className: 'blue-white-split to-tr',
};

export const PurpleBeam = Template.bind({});
PurpleBeam.decorators = Default.decorators;
PurpleBeam.args = {
  ...Default.args,
  className: 'purple-beam to-tr',
};

export const SandBeam = Template.bind({});
SandBeam.decorators = Default.decorators;
SandBeam.args = {
  ...Default.args,
  className: 'sand-beam to-tr',
};

export const IslandWaves = Template.bind({});
IslandWaves.decorators = Default.decorators;
IslandWaves.args = {
  ...Default.args,
  className: 'island-waves to-tr',
};

export const BigSur = Template.bind({});
BigSur.decorators = Default.decorators;
BigSur.args = {
  ...Default.args,
  className: 'big-sur to-tr',
};

export const Oahu = Template.bind({});
Oahu.decorators = Default.decorators;
Oahu.args = {
  ...Default.args,
  className: 'oahu to-tr',
};

export const PeachPie = Template.bind({});
PeachPie.decorators = Default.decorators;
PeachPie.args = {
  ...Default.args,
  className: 'peach-pie to-tr',
};

export const Salem = Template.bind({});
Salem.decorators = Default.decorators;
Salem.args = {
  ...Default.args,
  className: 'salem to-tr',
};

export const PurpleBurst = Template.bind({});
PurpleBurst.decorators = Default.decorators;
PurpleBurst.args = {
  ...Default.args,
  className: 'purple-burst to-tr',
};

export const AmberSunrise = Template.bind({});
AmberSunrise.decorators = Default.decorators;
AmberSunrise.args = {
  ...Default.args,
  className: 'amber-sunrise to-tr',
};

export const SkySea = Template.bind({});
SkySea.decorators = Default.decorators;
SkySea.args = {
  ...Default.args,
  className: 'sky-sea to-tr',
};

export const RocketPower = Template.bind({});
RocketPower.decorators = Default.decorators;
RocketPower.args = {
  ...Default.args,
  className: 'rocket-power to-tr',
};

export const BlueFlame = Template.bind({});
BlueFlame.decorators = Default.decorators;
BlueFlame.args = {
  ...Default.args,
  className: 'blue-flame to-tr',
};

export const WarmGlow = Template.bind({});
WarmGlow.decorators = Default.decorators;
WarmGlow.args = {
  ...Default.args,
  className: 'warm-glow to-tr',
};
