# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1] - 2021-06-21
### Fixed
- The collapse timer

## [0.4.0] - 2021-06-21
### Added
- A statistics menu (seconds until collapse)

### Fixed
- Load function not fixing broken saves
- Cardinal boost only boosting the second tab opener

## [0.3.14] - 2021-06-21
### Fixed
- Having no cardinals gives you no tab income when buying tab openers

## [0.3.13] - 2021-06-21
### Fixed
- The buttons for the autobuyer/melter not appearing until their original price

## [0.3.12] - 2021-06-20
### Fixed
- Collapsing more than once before reloading will display never-ending text for collapse when you have between 50 and 100 cardinals

## [0.3.11] - 2021-06-20
### Fixed
- Collapsing with less than 50 total cardinals causes the collapse text to never go away

## [0.3.10] - 2021-06-20
### Added
- Cardinals now boost tab production (cardinals^0.5)

## [0.3.9] - 2021-06-20
### Fixed
- The prices everywhere

## [0.3.8] - 2021-06-19
### Added
- A function to automatically fix undefined values in arrays

### Removed
- The save-fix button
- The fix function

## [0.3.7] - 2021-06-19
### Changed
- The price of autobuyer (100 -> 25)
- The price of melting (1000 -> 250)

## [0.3.6] - 2021-06-17
### Fixed
- Collapsing enabling light theme with white text

## [0.3.5] - 2021-06-16
### Changed
- Starting RAM (5MB -> 2MB)

## [0.3.4] - 2021-06-16
### Added
- Options menu

## [0.3.3] - 2021-06-16
### Added
- Dark theme (but you can't switch themes in-game)

## [0.3.2] - 2021-06-15
### Fixed
- Buying decrease upgrade too much causes scaling to go below 0 (ie. prices fall after buying)


## [0.3.1] - 2021-06-15
### Fixed
- The price decrease upgrade (now it decreases the scaling factor instead of the price)

## [0.3.0] - 2021-06-15
### Added
- RAM melting to increase RAM and collapse rewards

### Fixed
- Number of cardinal upgrades bought wasn't saved

## [0.2.3] - 2021-06-15
### Added
- A byte/second counter to see how fast your RAM is being used

## [0.2.2] - 2021-06-15
### Added
- The autobuy upgrade

### Changed
- Starting RAM (1MB -> 5MB)

### Fixed
- Collapsing making all cardinal upgrades have price of undefined

## [0.2.1] - 2021-06-15
### Fixed
- The first time game loading in wrong data

## [0.2.0] - 2021-06-15
### Added
- Cardinal gain when collapsing
- Cardinal menu
- Upgrades using cardinals

### Changed
- The amount of starting RAM (1kB -> 1MB)

## [0.1.2] - 2020-08-23
### Fixed
- Collapsing a 2nd+ time causing a broken game

## [0.1.1] - 2020-08-22
### Added
- Saving the game (and autosaving/loading)

### Fixed
- Collapse being horribly broken

## [0.1.0] - 2020-08-22
### Added
- RAM from [Reinhardt-C](https://github.com/Reinhardt-C)
- Ordinal Markup from [PatcailMemer](https://github.com/PatcailMemer)

### Fixed
- The newlines at the end of each file